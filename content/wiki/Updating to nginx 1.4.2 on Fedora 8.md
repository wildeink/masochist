---
tags: nginx fedora
---

These are update notes. For more detail, see "[Updating to nginx 0.8.54 and nginx upload module 2.2.0 on Fedora 8](/wiki/Updating_to_nginx_0.8.54_and_nginx_upload_module_2.2.0_on_Fedora_8)".

```shell
$ curl -O http://nginx.org/download/nginx-1.4.2.tar.gz \
       -O http://nginx.org/download/nginx-1.4.2.tar.gz.asc
$ gpg --verify nginx-1.4.2.tar.gz.asc
$ nice tar xzf nginx-1.4.2.tar.gz
$ cd nginx-1.4.2
$ nice ./configure --prefix=/usr/nginx \
                   --with-http_ssl_module \
                   --with-http_gzip_static_module
$ nice make
$ ps auxww | grep nginx # note old master process PID
$ sudo -s
# nice make install
# kill -s USR2 17998    # advise old master process to start a new master process using updated binary
# kill -s WINCH 17998   # gracefully shut down old worker processes
# kill -s QUIT 17998    # exit old master process
```

**Note:** The [nginx upload module](https://github.com/vkholodkov/nginx-upload-module) that I used to use is not compatible with 1.4.2. [This issue](https://github.com/vkholodkov/nginx-upload-module/issues/41) explores it at length. [One of the comments](https://github.com/vkholodkov/nginx-upload-module/issues/41#issuecomment-15650730) suggests using built-in functionality to obtain "async non-blocking upload without upstream":

       location /upload {
         limit_except POST              { deny all; }
         client_body_temp_path          /tmp/;
         client_body_in_file_only       on;
         client_body_buffer_size        128K;
         client_max_body_size           50M;
         proxy_pass_request_headers     on;
         proxy_set_body                 $request_body_file;
         proxy_pass                     http://upstream; # will receive file_name only
         proxy_redirect                 off;
       }

There's no resume support there, but it's still probably workable.