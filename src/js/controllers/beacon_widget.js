/**
 * Beacon Controller
 */

angular.module('RDash').controller('BeaconWidgetCtrl', ['$scope', '$q', '$http', function($scope, $q, $http) {


    getBeaconsList($q, $http).then(function(data) {

        for (key in data) {
            for (ds in data[key]) {
                data[key][ds].checked = false;
            }
        }

        $scope.organizations = data;
    }, function(error) {
        console.log('Failed: ' + error);
        $scope.error = error;
        console.log($scope.error);
    }, function(update) {
        console.log('Got notification: ' + update);
    });


    $scope.selectAll = function(selected) {

        for (var key in $scope.organizations) {
            var org = $scope.organizations[key];

            for (var key2 in org) {
                var dataset = org[key2];

                dataset.checked = selected;
            }
        }
    }

    $scope.refreshWidgetCode = function() {

        console.log("Refreshing code");

        var ids = [];

        for (var key in $scope.organizations) {
            var org = $scope.organizations[key];

            for (var key2 in org) {
                var dataset = org[key2];

                if (dataset.checked) {
                    ids.push("'" + dataset.id + "'");
                }
            }
        }


        $scope.code =
            "<script src=\"http://dnastack.com/ga4gh/bob/js/bobby.js\"></script>\n" +
            "<script>(\n" +
            "    function() {\n" +
            "        var beacons =[" + ids.join() + "];\n\n" +
            "        /* TODO: set these variables as per: https://github.com/ga4gh/schemas/blob/master/src/main/resources/avro/beacon.avdl */\n" +
            "        var chromosome=1;\n" +
            "        var allele=\"A\";\n" +
            "        var position=1;\n" +
            "        var genome=\"hg19\";\n\n" +
            "        writeIFrame(chromosome, position, allele, genome, beacons);\n" +
            "    })();\n" +
            "</script>";

    }

}]);