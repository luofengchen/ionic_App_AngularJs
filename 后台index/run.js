const encodeobj = {
    a : function (a) {
        var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
        for (d = 0; a > d; d += 1)
            e = Math.random() * b.length,
            e = Math.floor(e),
            c += this.b.charAt(e);
        return c
    },
    b : function (a, b) {
        var c = CryptoJS.enc.Utf8.parse(b)
          , d = CryptoJS.enc.Utf8.parse("0102030405060708")
          , e = CryptoJS.enc.Utf8.parse(a)
          , f = CryptoJS.AES.encrypt(e, c, {
            iv: d,
            mode: CryptoJS.mode.CBC
        });
        // console.log(f.toString())
        return f.toString()
    },
    c : function (a, b, c) {
        var d, e;
        return setMaxDigits(131),
        d = new RSAKeyPair(b,"",c),
        e = encryptedString(d, a)
    },
    d : function (d, e, f, g) {
        var h = {}
          , 
          // i = a(16)
          i = 'a8LWv2uAtXjzSfkQ'
          ;
          // console.log("h.encText:",encodeURIComponent(b(d, g)))
          // console.log('h.encSecKey:',encodeURIComponent(b(b(d, g), i)))
        return h.encText = this.b(d, g),
        h.encText = this.b(h.encText, i),
        h.encSecKey = this.c(i, e, f),
        h
      },
    e : function (a, b, d, e) {
        var f = {};
        return f.encText = this.c(a + e, b, d),
        f
    }
}