;(function () {
  angular.module('app.builder', []).component('builder', {
    templateUrl: 'app/pages/builder/builder.html',
    controllerAs: '$ctrl',
    controller: [
      '$http',
      function ($http) {
        var $ctrl = this

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

        /**
         * $ctrl.onWordChange()
         *
         * TODO: Remove function when backend is complete
         * Using this function to see what my object will look
         * like
         */
        $ctrl.onWordChange = function () {
          console.log($ctrl.selectedWord)
        }

        $ctrl.addWord = function () {
          $ctrl.currentSentence += $ctrl.selectedWord.title + ' '
        }

        $ctrl.postSentence = function () {
          if (!$ctrl.currentSentence) return

          console.log($ctrl.currentSentence)
        }

        /**
         * getWordTypes()
         *
         * Fetching all the word types available
         */
        function getWordTypes() {
          var url = backendUrl + '/wordTypes'

          $http.get(url).then(
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
            $ctrl.currentSentence = ''
            $ctrl.isWordTypeSelected = false

            return
          }

          $ctrl.words = [
            { id: '1', title: 'Run' },
            { id: '2', title: 'Easter' },
            { id: '3', title: 'accidentally' }
          ]
        }

        /**
         * constructor()
         *
         * First function to run in the controller
         * to fetch required data for the Sentence Builder form
         */
        function constructor() {
          getWordTypes()
        }

        constructor()
      }
    ]
  })
})()
