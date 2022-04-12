{
  inputs = {
    utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs";
  };

  outputs = { self, nixpkgs, utils }: {
    overlay = final: prev: {
      elvivero-env = final.callPackage ({ bundlerEnv, ruby }: bundlerEnv {
        name = "elvivero-env";
        inherit ruby;
        gemfile = ./Gemfile;
        lockfile = ./Gemfile.lock;
        gemset = ./gemset.nix;
      }) {};
      elvivero-web = final.callPackage ({ stdenv, elvivero-env, bundler, ruby, nodejs }: stdenv.mkDerivation {
        name = "elvivero";
        src = ./.;
        buildInputs = [ elvivero-env bundler ruby nodejs ];
        buildPhase = ''
          JEKYLL_ENV=production jekyll build
        '';
        installPhase = ''
          mkdir -p $out
          cp -Tr _site $out/www/
        '';
      }) {};
    };

  } // utils.lib.eachDefaultSystem (system:
  let
    pkgs = import nixpkgs { inherit system; overlays = [self.overlay]; };
    serve = pkgs.writeShellScriptBin "serve" ''
      export PATH="${pkgs.nodejs}/bin:$PATH"
      ${pkgs.elvivero-env}/bin/bundle exec jekyll serve --watch --incremental --livereload
    '';
    serve-prod = pkgs.writeShellScriptBin "serve-prod" ''
      export PATH="${pkgs.nodejs}/bin:$PATH"
      JEKYLL_ENV=production ${pkgs.elvivero-env}/bin/bundle exec jekyll serve --watch --incremental --livereload
    '';
    # push = pkgs.writeShellScriptBin "push" ''
    #   export PATH="${pkgs.nodejs}/bin:$PATH"
    #   ${pkgs.rsync}/bin/rsync -aPv ${pkgs.elvivero-web}/www/ lambda:/var/www/elvivero.es/
    # '';
  in
  rec {
    packages.elvivero-web= pkgs.elvivero-web;
    packages.elvivero-env = pkgs.elvivero-env;
    defaultPackage = packages.elvivero-web;

    nixosModule = { config, lib, pkgs, ... }: let
      cfg = config.webserver.elvivero;
    in {
      options.webserver.elvivero = with lib; {
        enable = mkEnableOption "elvivero.es web server";
        cloudflareCredentialsFile = mkOption {
          type = types.path;
          description = "Cloudflare credentials file.";
        };
      };
      config = lib.mkIf cfg.enable {
        security.acme.certs."elvivero.es" = {
          dnsProvider = "cloudflare";
          credentialsFile = cfg.cloudflareCredentialsFile;
          group = "nginx";
        };
        services = {
          nginx.virtualHosts = {
            "elvivero.es" = {
              useACMEHost = "elvivero.es";
              forceSSL = true;
              root = "${pkgs.elvivero-web}/www/";
              extraConfig = ''
                expires 1d;
                error_page 404 /404.html;
                error_log syslog:server=unix:/dev/log debug;
                access_log syslog:server=unix:/dev/log,tag=elvivero;
              '';
            };
            "www.elvivero.es" = {
              useACMEHost = "elvivero.es";
              forceSSL = true;
              locations."/".return = "301 https://elvivero.es$request_uri";
            };
          };
        };

      };
    };

    apps.serve = {
      type = "app";
      program = "${serve}/bin/serve";
    };

    apps.serve-prod = {
      type = "app";
      program = "${serve-prod}/bin/serve-prod";
    };

    # apps.push = {
    #   type = "app";
    #   program = "${push}/bin/push";
    # };

    defaultApp = apps.serve;

    devShell = pkgs.mkShell {
      nativeBuildInputs = with pkgs; [ elvivero-env bundler ruby nodejs ];
      shellHook = ''
      '';
    };
  });
}
