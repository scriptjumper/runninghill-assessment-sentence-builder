;(function () {
  angular.module('app.builder', []).component('builder', {
    templateUrl: 'app/pages/builder/builder.html',
    controllerAs: '$ctrl',
    controller: [
      '$http',
      function ($http) {
        var $ctrl = this

        $ctrl.sentences = []
        $ctrl.wordTypes = []
        $ctrl.words = []
        $ctrl.selectedWordType = null
        $ctrl.selectedWord = null
        $ctrl.isWordTypeSelected = false
        $ctrl.currentSentence = ''

        const backendUrl = 'http://localhost:8000'

        $ctrl.onWordTypeChange = function () {
          $ctrl.isWordTypeSelected = true

          getWordsByType()
        }

        $ctrl.addWord = function () {
          $ctrl.currentSentence += $ctrl.selectedWord.title + ' '
        }

        $ctrl.postSentence = function () {
          if (!$ctrl.currentSentence) return

          var postObj = { sentence: $ctrl.currentSentence }
          $http.post(backendUrl + '/sentence', JSON.stringify(postObj)).then(
            function () {
              // Resetting variables
              $ctrl.selectedWordType = null
              $ctrl.selectedWord = null
              $ctrl.currentSentence = ''

              getSentences()
            },
            function (error) {
              console.log(error)
            }
          )
        }

        /**
         * getWordTypes()
         *
         * Fetching all the word types available
         */
        function getWordTypes() {
          $http.get(backendUrl + '/wordTypes').then(
            function (res) {
              $ctrl.wordTypes = res.data
            },
            function (error) {
              console.log(error)
            }
          )
        }

        /**
         * getWordsByType()
         *
         * Fetches all the words under a word type which will be use to create a sentence
         * @returns
         */
        function getWordsByType() {
          if (!$ctrl.selectedWordType) {
            $ctrl.words = []

            return
          }

          $http.get(backendUrl + `/words/${$ctrl.selectedWordType}`).then(
            function (res) {
              $ctrl.words = res.data
            },
            function (error) {
              console.log(error)
            }
          )
        }

        /**
         * getSentences()
         *
         * Getting all saved sentences
         */
        function getSentences() {
          $http.get(backendUrl + '/sentences').then(
            function (res) {
              $ctrl.sentences = res.data
            },
            function (error) {
              console.log(error)
            }
          )
        }

        /**
         * constructor()
         *
         * First function to run in the controller
         * to fetch required data for the Sentence Builder form
         */
        function constructor() {
          getWordTypes()
          getSentences()
        }

        constructor()
      }
    ]
  })
})()
