{ pkgs }: {
    deps = [
        pkgs.nodejs-16_x,
        pkgs.openssh_with_kerberos
    ];
}