---
tags: rsync
---

# Example

```shell
$ rsync -avhW --progress some_dir/ some_dest/
```

## Legend

-   `-a`: archive mode, same as `-rlptgoD`
    -   `-r`: recurse into directories
    -   `-l`: copy symlinks as symlinks
    -   `-p`: preserve permissions
    -   `-t`: preserve times
    -   `-g`: preserve group
    -   `-o`: preserve owner (may require `sudo`)
    -   `-D`: same as `--devices` and `--specials`
        -   `--devices`: preserve device files (may require `sudo`)
        -   `--specials`: preserve "special" files (eg. named sockets, fifos)
-   `-v`: verbose
-   `-h`: "human-readable" units
-   `-W`: copy whole files at a time (avoid overhead of rsync diff algorithm)
-   `--progress`: show progress during transfer
