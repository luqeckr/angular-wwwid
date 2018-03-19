# FivesecCh

Tantangan Web Developer Untuk Membuat Aplikasi Web Bisa Digunakan Kurang Dari 5 Detik (https://medium.com/wwwid/tantangan-web-developer-untuk-membuat-aplikasi-web-bisa-digunakan-kurang-dari-5-detik-70bb7431741d)

Project ini menggunakan Framework gemuk angular, yg harus bs diload kurang dari 5 detik.

## Live Demo

https://id-ch-angular.firebaseapp.com/

## Artikel Medium
https://medium.com/angularid/tantangan-membuat-load-aplikasi-web-kurang-dari-5-detik-dengan-angular-5-3c38aa461b5c

## List perangkat 

- Angular 5.2.8
- Angular CLI 1.6.6
- Angular service worker

## Optimasi

- Optimasi kode: meminimalkan penggunaan ts/js dan css, termasuk tidak menggunakan component tambahan semacam material ataupun primeng
- tanpa component lazy load: component lazy load yg dicoba malah menambah ukuran akhir js nya, untuk real app sebenarnya bagus
- ngsw-config.json: prefect untuk gambar thumbnail dari https://cdn-images-1.medium.com, akan terasa ketika app di reload

## Peluang optimasi tambahan

masih ada beberapa hal yg belum optimal, seperti ttl dari gambar, error log yg masih masuk di console (menurut audit chrome), dll.
termasuk juga ukuran gambar yg tidak optimal untuk ditampilkan di first page. Mungkin juga component untuk category list dan feed-detail bisa ditempatkan di module yg berbeda untuk di lazy-load saja sehingga ukuran main-xxx-bundle.js bisa lebih kecil lagi..
Konfigurasi di ngsw-config.json masih amburadul, ketika di build menjadi ngsw.json tidak semuanya masuk, berarti tidak semuanya konfigurasinya valid, kalo konfigurasi di file ini bisa dioptimalkan, mungkin bisa lebih baik lagi.

Yg sempat terpikirkan jg adalah bagaimana meload image/thumbnail tanpa perlu menunggu load API json nya selesai (mungkinkah?)

## Hasil test

pertama:
https:///www.webpagetest.org/result/180315_W6_4cf90662c6d9147608a2592244d21373/

kedua:
https://www.webpagetest.org/result/180319_W1_5ae6813da711ea64973a499a2b989883/

