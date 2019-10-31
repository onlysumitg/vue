export const AppMixin = {
  beforeMount() {
    this.turnOffListeners();
  },
  mounted() {
    this.initialize();
    this.setupListeners();

  },
  beforeDestroy() {
    this.turnOffListeners();
  },
  deactivated() {
    this.turnOffListeners();
  },

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  data: function () {
    return {
      CancelTokenSource: {},
      xloading: false,
      xIsAdmin: false,
      menuVisible: true,

    }
  },

  computed: {
    isAdmin() {
      if (this.xIsAdmin) {
        return this.xIsAdmin
      }
      this.checkIfAdmin()
      return this.xIsAdmin
    }
  },
  //----------------------------------------------------------------------------
  //
  //----------------------------------------------------------------------------


  methods: {
    initialize() {},
    setupListeners() {

    },
    turnOffListeners() {},
    beforeChangeRoute(to, from, next, emitEvent, eventValue) {
      if (typeof emitEvent !== 'undefined' &&
        emitEvent.length > 0) {
        eventBus.$emit(emitEvent, eventValue);
      }
      this.$dialog
        .confirm("Do you really want to leave?")
        .then(function () {
          next();
        })
        .catch(function () {
          next(false);
        });
    },
    //----------------------------------------------------------------------------
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    hideLeftMenu() {
      this.menuVisible = false
      eventBus.$emit("hideleftsidemenu", true)
    },
    unhideLeftMenu() {
      this.menuVisible = true
      eventBus.$emit("hideleftsidemenu", false)
    },
    cancelAxiosRequest() {
      try {
        this.CancelTokenSource.cancel("Operation canceled by the user.");
      } catch (e) {
        console.log(e);
      }
    },

    //----------------------------------------------------------------------------

    notifyReloginRequied(message) {
      var vm = this;
      var errorMessage = message;
      if (errorMessage.trim().length <= 0) {
        errorMessage = "Please login again"
      }
      var notification = {
        message: errorMessage,
        onClose: function () {
          vm.$router.push({
            path: "/"
          });
        }
      };

      eventBus.$emit("notification", notification);
    },
    //----------------------------------------------------------------------------
    setupAxios() {
      // const sToken =  window.$cookies.get("QSQL_TOKEN");
      const sToken = this.$session.get("QSQL_TOKEN");

      axios.defaults.headers.common = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: sToken
      };

      return true;
    },

    //----------------------------------------------------------------------------

    openWebSocket(requestId, onMessage, onClose) {
      const sToken = this.$session.get("QSQL_TOKEN");
      var ws = new WebSocket("ws://localhost:7071/notifyme/" + requestId);
      ws.onmessage = msg => {

        var messageData = msg.data
        if (msg.data == "@DONE") {
          messageData = "<strong style='color:red'>-- -- -- -- -- -- -- -- -- -- -- END OF DATA -- -- -- -- -- -- -- -- -- -- --</strong>"
          ws.close();
        }
        onMessage(messageData, requestId)
      };
      ws.onclose = () => onClose(requestId);

      return ws;


    },

    getConnectedServerName() {
      return this.$session.get("currentservername")
    },
    //--------------------------------------------------------------------------
    getBaseUrl() {
      return axios.defaults.baseURL;
    },
    //----------------------------------------------------------------------------

    checkIfAdmin() {
      var vm = this;

      this.runWebService(
        "u/isa", {},
        function () {},
        function (respons) {
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.xIsAdmin = true;
          } else {
            vm.xIsAdmin = false;
          }
        },
        function (error) {
          vm.xIsAdmin = false;
        }
      );
    },
    //---------------------------------------------------------------
    isEmpty(value) {
      return _.isUndefined(value) || _.isEmpty(value.trim())
    },
    //---------------------------------------------------------------
    isNotEmpty(value) {
      return !this.isEmpty(value)
    },
    //----------------------------------------------------------------------------
    runWebService(url, params, beforeRun, onSucess, onError) {
      //      alert("ok3");
      this.xloading = true
      const CancelToken = axios.CancelToken;
      this.CancelTokenSource = CancelToken.source();
      params["source"] = "web"
      var vm = this;

      if (this.setupAxios()) {
        beforeRun();
        if (axios.defaults.baseURL == undefined) {
          return this.CancelTokenSource;

        }
        axios
          .post(url, params, {
            cancelToken: vm.CancelTokenSource.token
          })
          .then(response => {
            // alert(response);
            if (response.data.token !== undefined) {
              this.$session.set("QSQL_TOKEN", response.data.token);
            }
            try {

              if (response.data.status == 401) {
                this.notifyReloginRequied(response.data.message)
                throw new Error(response.data.message);
              }
            } catch (e) {

              throw e;
            }
            vm.xloading = false
            onSucess(response);

          })
          .catch(err => {
            vm.xloading = false
            //  alert(err);
            console.log("err>>")
            console.log(err)
            if (axios.isCancel(err)) {
              console.log('Request canceled', err.message);
            } else {

              try {
                if (err.response.status !== undefined && (err.response.status == 401 || err.response.data.status == 401)) {

                  this.notifyReloginRequied(err.response.data.message)
                  // vm.$router.push({
                  //   path: "/login"
                  // });
                }
              } catch (e) {

                throw e;
              }

            }
            onError(err);
          });
      }
      return this.CancelTokenSource;
    },
    //====================================================================================
    loadRPGEditor: function (monaco) {
      /*----------------------------------------SAMPLE JS START*/
      // Register a new language
      monaco.languages.register({
        id: 'myrpg'
      });
      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider('myrpg', this.getRPGTokenProvicer());
      // Define a new theme that contains only rules that match this language
      monaco.editor.defineTheme('myRPGTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [{
            token: 'custom-info',
            foreground: '808080'
          },
          {
            token: 'rpgbif',
            foreground: '0025FF',
            fontStyle: 'bold'
          },
          {
            token: 'custom-notice',
            foreground: 'FFA500'
          },
          {
            token: 'custom-date',
            foreground: '008800'
          },
          {
            token: 'endofpgm',
            foreground: '008800',

            fontStyle: 'bold'
          },
        ]
      });
      // Register a completion item provider for the new language
      monaco.languages.registerCompletionItemProvider('myrpg', {
        provideCompletionItems: () => {
          var suggestions = [{
              label: 'simpleText',
              kind: monaco.languages.CompletionItemKind.Text,
              insertText: 'simpleText'
            }, {
              label: 'testing',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'testing(${1:condition})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule
                .InsertAsSnippet
            }, {
              label: 'ifelse',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                'if (${1:condition}) ;',
                '\t$0',
                '} else ;',
                '\t',
                'endif'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule
                .InsertAsSnippet,
              documentation: 'If-Else Statement'
            }

            , {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                'if (${1:condition}) ;',
                '\t',
                'endif'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule
                .InsertAsSnippet,
              documentation: 'If Statement'
            }

          ];
          return {
            suggestions: suggestions
          };
        }
      });



      /*----------------------------------------SAMPLE CSS END*/
    },


    //====================================================================================
    getRPGTokenProvicer: function () {
      // Create your own language definition here
      // You can safely look at other samples without losing modifications.
      // Modifications are not saved on browser refresh/close though -- copy often!
      return {
        // Set defaultToken to invalid to see what you do not tokenize yet
        // defaultToken: 'invalid',

        keywords: ['closqlcsr', 'EXSR', 'EXEC SQL', 'else', 'endif', 'endsr', 'BEGSR',
          'ACQ', 'ACTGRP', 'ADD', 'ALIAS', 'ALIGN', 'ALLOC', 'ALT', 'ALTSEQ', 'ALWNULL', 'ASCEND', 'AUT', 'BASED', 'BITOFF', 'BITON', 'BLOCK', 'BNDDIR', 'CASE', 'CCSID', 'CHAIN', 'CLASS', 'CLEAR', 'CLOSE', 'COMMIT', 'CONST', 'COPYNEST', 'COPYRIGHT', 'CTDATA', 'CURSYM', 'CVTOPT', 'DATEDIT', 'DATFMT', 'DDS', 'DEBUG', 'DECEDIT', 'DECPREC', 'DELETE', 'DESCEND', 'DEVID', 'DFTACTGRP', 'DFTNAM', 'DIM', 'DO', 'DTAARA', 'ENBPFRCOL', 'END', 'EVAL', 'EVALR', 'EXCEPT', 'EXFMT', 'EXPORT', 'EXPROPTS', 'EXTBININT', 'EXTDESC', 'EXTFILE', 'EXTFLD', 'EXTFMT', 'EXTIND', 'EXTMBR', 'EXTNAME', 'EXTPGM', 'EXTPROC', 'FEOD', 'FIXNBR', 'FLTDIV', 'FOR', 'FORCE', 'FORMLEN', 'FORMOFL', 'FORMSALIGN', 'FROMFILE', 'FTRANS', 'GENLVL', 'IF', 'IGNORE  ', 'IMPORT', 'INCLUDE', 'INDDS', 'INDENT', 'INFDS', 'INFSR', 'INTO', 'INTPREC', 'INZ', 'ITER', 'KEYLOC', 'LANGID', 'LEAVE', 'LEAVESR', 'LEN', 'LIKE', 'LIKEDS', 'LIKEFILE', 'LIKERE  C', 'LOOKUP', 'MAXDEV', 'MOVE', 'MOVEA', 'NEXT', 'NOMAIN', 'NOOPT', 'OCCUR', 'OCCURS', 'OFLIND', 'ON-ERROR', 'OPDESC', 'OPEN', 'OPENOPT', 'OPTIMIZE', 'OPTION', 'OPTIONS', 'OR', 'O  THER', 'OVERLAY', 'PACKEVEN', 'PASS', 'PERRCD', 'PGMNAME', 'PLIST', 'POST', 'PREFIX', 'PRFDTA', 'PROCPTR', 'PRTCTL', 'QUALIFIED', 'RAFDATA', 'READ', 'READC', 'READE', 'READP', 'RE  ADPE', 'RECNO', 'REL', 'RENAME', 'RESET', 'ROLBK', 'RTNPARM', 'SAVEDS', 'SAVEIND', 'SAX', 'SELECT', 'SETGT', 'SETLL', 'SFILE', 'SLN', 'SRTSEQ', 'STATIC', 'STGMDL', 'TAG', 'TEMPLAT  E', 'TESTB', 'TEXT', 'THREAD', 'TIMFMT', 'TOFILE', 'TRUNCNBR', 'UNLOCK', 'UPDATE', 'USROPN', 'USRPRF', 'VALUE', 'VARYING', 'WHEN', 'WRITE', 'XFOOT'
        ],

        starwords: [
          '*Blanks'
        ],

        endofpgm: ['*InLR', 'Return'],

        hspec: [
          'NO-MAIN',
          'ctl-opt'
        ],

        dsepec: [
          'DCL-S',
          'DCL-S',
          'DCL-DS',
          'ZONED',
          'PACKED',
          'CHAR',
          'VARCHAR',

          'dcl-pr',
          'end-pr',
          'dcl-proc',
          'end-proc',
          'dcl-pi',
          'end-pi'
        ],

        bifs: [
          '%ABS',
          '%ADDR',
          '%ALLOC',
          '%BITAND',
          '%BITNOT',
          '%BITOR',
          '%BITXOR',
          '%CHAR',
          '%CHECK',
          '%CHECKR',
          '%DATE',
          '%DAYS',
          '%DEC',
          '%DECH',
          '%DECPOS',
          '%DIFF',
          '%DIV',
          '%EDITC',
          '%EDITFLT',
          '%EDITW',
          '%ELEM',
          '%EOF',
          '%EQUAL',
          '%ERROR',
          '%FIELDS',
          '%FLOAT',
          '%FOUND',
          '%GRAPH',
          '%HANDLER',
          '%HOURS',
          '%INT',
          '%INTH',
          '%KDS',
          '%LEN',
          '%LOOKUPxx',
          '%MINUTES',
          '%MONTHS',
          '%MSECONDS',
          '%NULLIND',
          '%OCCUR',
          '%OPEN',
          '%PADDR',
          '%PARMS',
          '%PARMNUM',
          '%REALLOC',
          '%REM',
          '%REPLACE',
          '%SCAN',
          '%SCANRPL',
          '%SECONDS',
          '%SHTDN',
          '%SIZE',
          '%SQRT',
          '%STATUS',
          '%STR',
          '%SUBARR',
          '%SUBDT',
          '%subst',
          '%THIS',
          '%TIME',
          '%TIMESTAMP',
          '%TLOOKUPxx',
          '%TRIM',
          '%TRIML',
          '%TRIMR',
          '%UCS2',
          '%UNS',
          '%UNSH',
          '%XFOOT',
          '%XLATE',
          '%XML',
          '%YEARS'

        ],



        typeKeywords: [
          'zoned', 'packed', 'char', 'varchar'
        ],

        operators: [
          '=', '>', '<', 'not', '~', '?', ':', '==', '<=', '>=', '!=',
          'and', 'or', '+', '-', '*', '**', '/', '^', '%',
          '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
          '%=', '<<=', '>>=', '>>>='
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,

        // C# style strings
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        ignoreCase: true,
        // The main tokenizer for our languages
        tokenizer: {
          root: [
            [/\w*\-\w*/, {
              cases: {
                '@dsepec': 'keyword',

                '@default': 'identifier'
              }
            }],

            // identifiers and keywords
            [/[\*a-zA-Z_\-$][\w\-$]*/, {
              cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@bifs': 'rpgbif',
                '@endofpgm': 'endofpgm',
                '@default': 'identifier'
              }
            }],


            [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely
            [/\%[\w\-$]*/, {
              cases: {

                '@bifs': 'rpgbif',

                '@default': 'identifier'
              }
            }],


            // whitespace
            {
              include: '@whitespace'
            },

            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
              cases: {
                '@operators': 'operator',
                '@default': ''
              }
            }],

            // @ annotations.
            // As an example, we emit a debugging log message on these tokens.
            // Note: message are supressed during the first load -- change some lines to see them.
            [/@\s*[a-zA-Z_\$][\w\$]*/, {
              token: 'annotation',
              log: 'annotation token: $0'
            }],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
            [/'/, {
              token: 'string.quote',
              bracket: '@open',
              next: '@string'
            }],

            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
          ],

          comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'], // nested comment
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment'],


          ],

          string: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, {
              token: 'string.quote',
              bracket: '@close',
              next: '@pop'
            }]
          ],
          ///qsys.lib/sgoyal.lib/qrpglesrc.file/test_1.mbr
          whitespace: [
            [/^.{6}\*.*/, 'comment'],
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],

          ],
        },
      };

    }



    //======================================================================================
  }
};
