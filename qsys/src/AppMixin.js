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

  methods: {
    initialize() {},
    setupListeners() {},
    turnOffListeners() {},

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

    runWebService(url, params, beforeRun, onSucess, onError) {
      //      alert("ok3");
      if (this.setupAxios()) {
        beforeRun();
        if (axios.defaults.baseURL == undefined) {
          return;

        }
        axios
          .post(url, params)
          .then(response => {
            try {
              onSucess(response);
            } catch (e) {
              console.log(url);
              console.log(e);
            }
          })
          .catch(err => {
            //alert(err);
            console.log(err);
            onError(err);
          });
      }
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
        base: 'vs',
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

        keywords: [
          'USRPRF',
          'ACTGRP',
          'ALIAS',
          'ALIGN',
          'ALLOC',
          'ALT',
          'ALTSEQ',
          'ALWNULL',
          'ASCEND',
          'AUT',
          'BASED',
          'EXTBININT',
          'BLOCK',
          'BNDDIR',
          'CCSID',
          'CCSID',
          'CLASS',
          'COMMIT',
          'CONST',
          'COPYNEST',
          'COPYRIGHT',
          'CTDATA',
          'CURSYM',
          'CVTOPT',

          'DATEDIT',
          'DATFMT',
          'DEBUG',
          'DECEDIT',
          'DECPREC',
          'LIKE',

          'DESCEND',

          'OPDESC',
          'DEVID',
          'DFTACTGRP',
          'DFTNAM',
          'DIM',
          'DTAARA',
          'ENBPFRCOL',
          'EXPORT',
          'EXPROPTS',
          'EXTBININT',
          'EXTDESC',
          'EXTFILE',
          'EXTFLD',
          'EXTFMT',
          'EXTIND',
          'EXTMBR',
          'EXTNAME',
          'EXTPGM',
          'EXTPROC',

          'INFSR',
          'INFDS',
          'FTRANS',
          'FIXNBR',
          'FLTDIV',
          'FLTDIV',
          'FORMLEN',
          'FORMOFL',
          'FORMSALIGN',
          'FROMFILE',
          'FTRANS',
          'GENLVL',
          'IGNORE',
          'IMPORT',
          'INCLUDE',
          'INDDS',
          'INDENT',
          'INDDS',
          'INFDS',
          'INFSR',
          'INZ',
          'INTPREC',
          'DDS',
          'INZ',
          'CLASS',
          'EXTPROC',
          'KEYLOC',
          'LANGID',
          'LEN',
          'LIKE',
          'LIKEDS',
          'LIKEFILE',
          'LIKEREC',
          'MAXDEV',

          'NOMAIN',
          'NOOPT',
          'OCCURS',
          'OFLIND',
          'OPDESC',
          'OPENOPT',
          'OPDESC',
          'OPTIMIZE',
          'OPTION',
          'OPTIONS',
          'OVERLAY',
          'PACKEVEN',
          'PASS',
          'CONST',
          'PERRCD',
          'PGMNAME',
          'PLIST',
          'PROCPTR',
          'PREFIX',
          'PRFDTA',
          'PROCPTR',


          'PROCPTR',


          'OPTIONS',
          'VALUE',
          'PRTCTL',
          'QUALIFIED',
          'RAFDATA',
          'RECNO',
          'RECNO',
          'RAFDATA',
          'RECNO',
          'RENAME',
          'RTNPARM',
          'SAVEDS',
          'SAVEIND',
          'SFILE',
          'SLN',
          'SRTSEQ',
          'STATIC',
          'STGMDL',
          'TEMPLATE',
          'TEXT',
          'THREAD',
          'TIMFMT',
          'TOFILE',
          'TRUNCNBR',
          'USROPN',
          'USRPRF',
          'VALUE',
          'VARYING',
          'VARYING',
          'INTO',
          'SAX',
          'ADD',
          'LOOKUP',
          'MOVEA',
          'XFOOT',
          'BITON',
          'BITOFF',
          'BITON',
          'CLEAR',
          'UNLOCK',
          'OCCUR',
          'DO',
          'FOR',
          'RESET',
          'MOVE',
          'FORCE',
          'OPEN',
          'OR',
          'OCCUR',
          'EXCEPT',
          'RESET',
          'XFOOT',
          'TAG',
          'TESTB',
          'ACQ',
          'CHAIN',
          'CLOSE',
          'COMMIT',
          'DELETE',
          'EXCEPT',
          'EXFMT',
          'FEOD',
          'FORCE',
          'NEXT',
          'OPEN',
          'POST',
          'READ',
          'READC',
          'READE',
          'READP',
          'READPE',
          'REL',
          'ROLBK',
          'SETGT',
          'SETLL',
          'UNLOCK',
          'UPDATE',
          'WRITE',
          'IF',
          'CASE',
          'SELECT',
          'WHEN',
          'OTHER',
          'ITER',
          'LEAVE',
          'LEAVESR',

          'END',
          'EVAL',
          'EVALR',
          'FOR',
          'ON-ERROR',
          'Begsr',
          'EndSr',
          'EXSR',
          'Exec SQL',
          'EndIf',
          'Monitor',

          'Endmon',
          'endFor',
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

        starwords: [
          '*Blanks'
        ],

        endofpgm: ['*InLR'],

        HSPEC: [
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


            // identifiers and keywords
            [/[a-zA-Z_\-$][\w\-$]*/, {
              cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@bifs': 'rpgbif',
                'dsepec': 'keyword',
                'hsepc': 'keyword',
                '@default': 'identifier'
              }
            }],


            [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely
            [/\%[\w\-$]*/, {
              cases: {

                '@bifs': 'keyword',

                '@default': 'identifier'
              }
            }],

            [/\w*\-\w*/, {
              cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@bifs': 'rpgbif',
                'dsepec': 'keyword',
                'hsepc': 'keyword',
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
            [/[\/*]/, 'comment']
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

          whitespace: [
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
