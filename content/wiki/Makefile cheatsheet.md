---
tags: make
cache_breaker: 1
---

# Automatic variables

-   `$@`: file being generated
-   `$<`: first pre-requisite

# Functions

-   `wildcard`
-   `addprefix`

# Order-only prerequisites

    # "target" depends on "dependency" but last-modified date is not considered
    target: | dependency

# `FORCE` targets

    # "target" always gets built...
    target: FORCE

    # ...because it depends on this non-existent file
    FORCE:

See also:

-   <https://www.gnu.org/software/make/manual/html_node/Force-Targets.html>

# External resources

-   List of automatic variables (`$@` etc): <https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html>
-   <http://www.schacherer.de/frank/technology/tools/make.html>
