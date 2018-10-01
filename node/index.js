(function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var equals = Kotlin.equals;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function main$ObjectLiteral() {
    this.extended = true;
  }
  main$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda(closure$urlTools) {
    return function (req, res) {
      var tmp$;
      var url = (tmp$ = req.query.url) == null || typeof tmp$ === 'string' ? tmp$ : throwCCE();
      if (url == null) {
        return res.status(404).send(json([to('error', 'Nenhuma URL foi informada como parametro!'), to('code', 5)]));
      }
       else {
        var result = closure$urlTools.shortUrl_61zpoe$(url);
        return res.status(200).send(JSON.parse(JSON.stringify(result)));
      }
    };
  }
  function main$lambda_0(closure$urlTools) {
    return function (req, res) {
      var tmp$;
      var shortId = (tmp$ = req.params['shortId']) == null || typeof tmp$ === 'string' ? tmp$ : throwCCE();
      if (shortId == null) {
        return res.status(404).send(json([to('error', 'Nenhuma URL foi informada como parametro!'), to('code', 5)]));
      }
       else {
        var result = closure$urlTools.unshortUrl_61zpoe$(shortId);
        if (result['error'] != null) {
          return res.status(500).send(result);
        }
         else {
          var decoded = JSON.parse(JSON.stringify(result));
          return res.redirect(decoded.type + '://' + decoded.originalUrl);
        }
      }
    };
  }
  function main$lambda_1(closure$urlTools) {
    return function (f, res) {
      var result = closure$urlTools.getAllUrls();
      if (result['error'] != null) {
        return res.status(500).send(result);
      }
       else {
        return res.status(200).send(result);
      }
    };
  }
  function main$lambda_2() {
    println('[>] LVL URL SHORTENER is running! \n[!] Port: 3000');
    return Unit;
  }
  function main(args) {
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    var urlTools = new UrlTools();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(new main$ObjectLiteral()));
    app.get('/short', main$lambda(urlTools));
    app.get('/:shortId', main$lambda_0(urlTools));
    app.get('/', main$lambda_1(urlTools));
    var listen = app.listen(3000, main$lambda_2);
  }
  function UrlTools() {
    this.shortenedCollection_0 = ArrayList_init();
    this._min_0 = 1000000;
    this._max_0 = 9999999;
  }
  var Math_0 = Math;
  UrlTools.prototype.shortUrl_61zpoe$ = function (url) {
    var tmp$;
    var x = this.random_9tsm8a$(new IntRange(this._min_0, this._max_0));
    var serialize = Math_0.floor(x);
    var shortened = serialize.toString();
    if (this.shortenedCollection_0.size > 0) {
      var $receiver = this.shortenedCollection_0;
      var firstOrNull$result;
      firstOrNull$break: do {
        var tmp$_0;
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (equals(element.shortId, shortened)) {
            firstOrNull$result = element;
            break firstOrNull$break;
          }
        }
        firstOrNull$result = null;
      }
       while (false);
      if (firstOrNull$result != null) {
        this.shortUrl_61zpoe$(url);
      }
    }
    var sce = new ShortenedURLElement(url, shortened, equals(url.substring(0, 5), 'https'));
    if (this.shortenedCollection_0.size <= this._max_0) {
      this.shortenedCollection_0.add_11rb$(sce);
      tmp$ = JSON.parse(JSON.stringify(sce));
    }
     else
      tmp$ = json([to('error', 'Infelizmente atingimos o limite de URLs encurtadas!'), to('code', 3)]);
    return tmp$;
  };
  UrlTools.prototype.unshortUrl_61zpoe$ = function (shortned) {
    var tmp$;
    var notFound = json([to('error', 'A URL nao foi encontrada ou esta expirada!'), to('code', 2)]);
    var $receiver = this.shortenedCollection_0;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        if (equals(element.shortId, shortned)) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    var url = firstOrNull$result;
    if (url == null) {
      tmp$ = notFound;
    }
     else {
      var encodedDate = (new Date(url.checkIn)).getTime();
      var expireLimit = (new Date()).getTime() + (5 * ((60000 * 60 | 0) * 24 | 0) | 0);
      if (encodedDate >= expireLimit) {
        this.shortenedCollection_0.remove_11rb$(url);
        tmp$ = notFound;
      }
       else
        tmp$ = JSON.parse(JSON.stringify(url));
    }
    return tmp$;
  };
  UrlTools.prototype.getAllUrls = function () {
    var urls = ArrayList_init();
    if (this.shortenedCollection_0.size === 0) {
      return json([to('error', 'Nenhuma URL foi encurtada ainda'), to('code', 1)]);
    }
    var tmp$;
    tmp$ = this.shortenedCollection_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      urls.add_11rb$(json([to('shortId', element.shortId), to('url', element.originalUrl)]));
    }
    return json([to('urls', urls.toJSON())]);
  };
  UrlTools.prototype.random_9tsm8a$ = function ($receiver) {
    return Math.random() * $receiver.start + $receiver.endInclusive;
  };
  UrlTools.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'UrlTools',
    interfaces: []
  };
  function ShortenedURLElement(originalUrl, shortId, hasSecurity) {
    this.originalUrl = originalUrl;
    this.shortId = shortId;
    this.hasSecurity = hasSecurity;
    this.type = this.hasSecurity ? 'https' : 'http';
    this.checkIn = Date.now();
  }
  ShortenedURLElement.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ShortenedURLElement',
    interfaces: []
  };
  ShortenedURLElement.prototype.component1 = function () {
    return this.originalUrl;
  };
  ShortenedURLElement.prototype.component2 = function () {
    return this.shortId;
  };
  ShortenedURLElement.prototype.component3 = function () {
    return this.hasSecurity;
  };
  ShortenedURLElement.prototype.copy_qz9155$ = function (originalUrl, shortId, hasSecurity) {
    return new ShortenedURLElement(originalUrl === void 0 ? this.originalUrl : originalUrl, shortId === void 0 ? this.shortId : shortId, hasSecurity === void 0 ? this.hasSecurity : hasSecurity);
  };
  ShortenedURLElement.prototype.toString = function () {
    return 'ShortenedURLElement(originalUrl=' + Kotlin.toString(this.originalUrl) + (', shortId=' + Kotlin.toString(this.shortId)) + (', hasSecurity=' + Kotlin.toString(this.hasSecurity)) + ')';
  };
  ShortenedURLElement.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.originalUrl) | 0;
    result = result * 31 + Kotlin.hashCode(this.shortId) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasSecurity) | 0;
    return result;
  };
  ShortenedURLElement.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.originalUrl, other.originalUrl) && Kotlin.equals(this.shortId, other.shortId) && Kotlin.equals(this.hasSecurity, other.hasSecurity)))));
  };
  _.main_kand9s$ = main;
  var package$control = _.control || (_.control = {});
  package$control.UrlTools = UrlTools;
  var package$model = _.model || (_.model = {});
  package$model.ShortenedURLElement = ShortenedURLElement;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));

//# sourceMappingURL=index.js.map
