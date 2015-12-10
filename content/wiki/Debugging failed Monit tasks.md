---
tags: monit
---

Example of trying to debug a failure to start a [Unicorn](/wiki/Unicorn) process for a `rails` user:

```shell
$ sudo -u rails -s # be the user that monit will try to run as
$ env -i PATH=/bin:/usr/bin:/sbin:/usr/sbin /bin/sh # emaciated environment like monit's
$ export # inspect environment
$ /bin/env PATH=/rails-user-home/bin:/sbin:/bin:/usr/sbin:/usr/bin \
  /path/to/bin/unicorn \
  -c /path/to/config/unicorn.rb \
  -E production
```

# Source

-   <http://stackoverflow.com/questions/3356476/debugging-monit>
