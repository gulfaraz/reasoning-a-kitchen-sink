angular.module("kitchenSinkApp", [])
    .controller("RootCtrl", ["$scope", "$timeout", function (scope, timeout) {
        scope.delay = 1000;

        scope.showGraph = true;
        scope.showExplaination = true;

        scope.log = [ "Click 'Start' Button" ];
        scope.error = [ "Click 'Start' Button" ];

        scope.magnitudes = [0, 1, 2];
        scope.derivatives = [-1, 0, 1];

        scope.inflowInputs = [ "0", "+" ];
        scope.volumeInputs = [ "0", "+", "M" ];

        scope.derivativeInputs = [
            "Steady",
            "Increasing",
            "Decreasing",
            "Parabola Positive",
            "Parabola Negative",
            "Sinusoidal"
        ];

        scope.initialInflow = "0";
        scope.initialVolume = "0";

        scope.selectedInflowDerivative = "Sinusoidal";

        var limit = 999999999;

        function getId(inflow, derivativeInflow, volume, derivativeVolume) {
            var id = (scope.magnitudes.indexOf(inflow) + 1) * 1000 + (scope.derivatives.indexOf(derivativeInflow) + 1) * 100 + (scope.magnitudes.indexOf(volume) + 1) * 10 + (scope.derivatives.indexOf(derivativeVolume) +1);
            return id;
        }

        function newState(inflow, derivativeInflow, volume, derivativeVolume) {
            var id = getId(inflow, derivativeInflow, volume, derivativeVolume);
            var stateObject = {
                "id": id,
                "index": (indices.indexOf(id) < 10 ? "0" + indices.indexOf(id) : indices.indexOf(id)),
                "display": function constructDisplayText() {
                    var idText = "ID=" + (indices.indexOf(id) < 10 ? "0" + indices.indexOf(id) : indices.indexOf(id));
                    var inflowText = "Inflow(" + (inflow == 0 ? "0" : "+") + "," + (derivativeInflow == 0 ? "0" : (derivativeInflow == -1 ? "-" : "+")) + ")";
                    var volumeText = "Volume(" + (volume == 0 ? "0" : (volume == 1 ? "+" : "MAX")) + "," + (derivativeVolume == 0 ? "0" : (derivativeVolume == -1 ? "-" : "+")) + ")";
                    var heightText = "Height(" + (volume == 0 ? "0" : (volume == 1 ? "+" : "MAX")) + "," + (derivativeVolume == 0 ? "0" : (derivativeVolume == -1 ? "-" : "+")) + ")";
                    var pressureText = "Pressure(" + (volume == 0 ? "0" : (volume == 1 ? "+" : "MAX")) + "," + (derivativeVolume == 0 ? "0" : (derivativeVolume == -1 ? "-" : "+")) + ")";
                    var outflowText = "Outflow(" + (volume == 0 ? "0" : (volume == 1 ? "+" : "MAX")) + "," + (derivativeVolume == 0 ? "0" : (derivativeVolume == -1 ? "-" : "+")) + ")";
                    return [idText, inflowText, volumeText, heightText, pressureText, outflowText].join("|");
                }(inflow, derivativeInflow, volume, derivativeVolume),
                "inflow": inflow,
                "derivativeInflow": derivativeInflow,
                "volume": volume,
                "derivativeVolume": derivativeVolume
            };
            return stateObject;
        }

        var indices = [
            getId(0,0,0,0),
            getId(0,1,0,0),
            getId(1,-1,1,0),
            getId(1,0,1,0),
            getId(1,1,1,0),
            getId(1,-1,2,0),
            getId(1,0,2,0),
            getId(1,1,2,0),
            getId(1,-1,0,1),
            getId(1,0,0,1),
            getId(1,1,0,1),
            getId(1,-1,1,1),
            getId(1,0,1,1),
            getId(1,1,1,1),
            getId(0,0,1,-1),
            getId(0,1,1,-1),
            getId(1,-1,1,-1),
            getId(1,0,1,-1),
            getId(1,1,1,-1),
            getId(0,0,2,-1),
            getId(0,1,2,-1),
            getId(1,-1,2,-1),
            getId(1,0,2,-1),
            getId(1,1,2,-1)
        ];

        var stateList = [
            newState(0,0,0,0),
            newState(0,1,0,0),
            newState(1,-1,1,0),
            newState(1,0,1,0),
            newState(1,1,1,0),
            newState(1,-1,2,0),
            newState(1,0,2,0),
            newState(1,1,2,0),
            newState(1,-1,0,1),
            newState(1,0,0,1),
            newState(1,1,0,1),
            newState(1,-1,1,1),
            newState(1,0,1,1),
            newState(1,1,1,1),
            newState(0,0,1,-1),
            newState(0,1,1,-1),
            newState(1,-1,1,-1),
            newState(1,0,1,-1),
            newState(1,1,1,-1),
            newState(0,0,2,-1),
            newState(0,1,2,-1),
            newState(1,-1,2,-1),
            newState(1,0,2,-1),
            newState(1,1,2,-1)
        ];

        var relations = [
            [indices[0], indices[1]],
            [indices[1], indices[10]],
            [indices[2], indices[16]],
            [indices[3], indices[4]],
            [indices[3], indices[2]],
            [indices[4], indices[13]],
            [indices[5], indices[21]],
            [indices[6], indices[5]],
            [indices[6], indices[7]],
            [indices[8], indices[11]],
            [indices[9], indices[12]],
            [indices[9], indices[11]],
            [indices[9], indices[13]],
            [indices[10], indices[13]],
            [indices[11], indices[12]],
            [indices[11], indices[3]],
            [indices[12], indices[2]],
            [indices[12], indices[5]],
            [indices[12], indices[6]],
            [indices[12], indices[13]],
            [indices[12], indices[3]],
            [indices[13], indices[3]],
            [indices[13], indices[6]],
            [indices[14], indices[0]],
            [indices[14], indices[1]],
            [indices[14], indices[15]],
            [indices[15], indices[18]],
            [indices[16], indices[0]],
            [indices[16], indices[14]],
            [indices[16], indices[3]],
            [indices[16], indices[17]],
            [indices[17], indices[16]],
            [indices[17], indices[18]],
            [indices[17], indices[4]],
            [indices[17], indices[3]],
            [indices[18], indices[17]],
            [indices[18], indices[4]],
            [indices[19], indices[15]],
            [indices[19], indices[14]],
            [indices[20], indices[18]],
            [indices[21], indices[16]],
            [indices[22], indices[18]],
            [indices[22], indices[17]],
            [indices[22], indices[16]],
            [indices[23], indices[18]]
        ];

        scope.resetStates = function () {
            drawGraph();
            scope.showGraph = true;
        };

        function showState(id, stateLists) {
            var show = false;
            for(var stateListIndex in stateLists) {
                var stateList = stateLists[stateListIndex];
                for(var stateItemIndex in stateList) {
                    if(id == stateList[stateItemIndex]) {
                        return true;
                    }
                }
            }
            return show;
        }

        function showConnection(connectionLists, interConnectionLists, source, target) {
            var show = false;
            for(var connectionListIndex in connectionLists) {
                var connectionList = connectionLists[connectionListIndex];
                for(var connectionIndex in connectionList) {
                    if(source == connectionList[connectionIndex][0] && target == connectionList[connectionIndex][1]) {
                        return true;
                    }
                }
            }
            for(var interConnectionListIndex in interConnectionLists) {
                var interConnectionList = interConnectionLists[interConnectionListIndex];
                for(var interConnectionIndex in interConnectionList) {
                    if(source == interConnectionList[interConnectionIndex][0] && target == interConnectionList[interConnectionIndex][1]) {
                        return true;
                    }
                }
            }
            return show;
        }

        function isShortestState(path, value) {
            return (path.indexOf(value) > -1);
        }

        function isShortestPath(path, value) {
            return (path.indexOf(value[1]) > -1 && path.indexOf(value[0]) > -1);
        }

        function drawGraph(states, relationList, interRelationList, path) {
            var filter = false;
            if(path) {
                filter = true;
            }
            var graph = new joint.dia.Graph();
            var paper = new joint.dia.Paper({
                el: $('.sink-state-graph'),
                width: 1200,
                height: 1050,
                gridSize: 1,
                model: graph
            });
            var uml = joint.shapes.uml;
            var classes = {};
            var arrows = [];

            var state2class = {};
            angular.forEach(stateList, function (value, index) {
                state2class[value.id] = index;
                if(!filter || showState(value.id, states)) {
                    var stateColor = '#feb662';
                    if(filter && isShortestState(path, value.id)) {
                        stateColor = '#f49999';
                    }
                    classes[index] = new uml.Class({
                        position: { x: 100 + (250 * (index % 4)), y: 25 + (150 * index / 4) },
                        size: { width: 200, height: 100 },
                        name: 'ID=' + value.index + '\t\tInflow (' + (value.inflow == 0 ? "0" : "+")  + ', ' + (value.derivativeInflow == 0 ? "0" : (value.derivativeInflow == -1 ? "-" : "+")) + ')',
                        attributes: ['Volume (' + (value.volume == 0 ? "0" : (value.volume == 1 ? "+" : "MAX")) + ', ' + (value.derivativeVolume == 0 ? "0" : (value.derivativeVolume == -1 ? "-" : "+")) + ')\t\tHeight (' + (value.volume == 0 ? "0" : (value.volume == 1 ? "+" : "MAX")) + ', ' + (value.derivativeVolume == 0 ? "0" : (value.derivativeVolume == -1 ? "-" : "+")) + ')'],
                        methods: ['Pressure (' + (value.volume == 0 ? "0" : (value.volume == 1 ? "+" : "MAX")) + ', ' + (value.derivativeVolume == 0 ? "0" : (value.derivativeVolume == -1 ? "-" : "+")) + ')\t\tOutflow (' + (value.volume == 0 ? "0" : (value.volume == 1 ? "+" : "MAX")) + ', ' + (value.derivativeVolume == 0 ? "0" : (value.derivativeVolume == -1 ? "-" : "+")) + ')'],
                        attrs: {
                            '.uml-class-name-rect': {
                                fill: stateColor,
                                stroke: '#ffffff',
                                'stroke-width': 1
                            },
                            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                                fill: stateColor,
                                stroke: '#ffffff',
                                'stroke-width': 1
                            },
                            '.uml-class-attrs-text': {
                                ref: '.uml-class-attrs-rect',
                                'ref-y': 0.5,
                                'ref-x': 0.5,
                                'y-alignment': 'middle',
                                'x-alignment': 'middle'
                            },
                            '.uml-class-methods-text': {
                                ref: '.uml-class-methods-rect',
                                'ref-y': 0.5,
                                'ref-x': 0.5,
                                'y-alignment': 'middle',
                                'x-alignment': 'middle'
                            }
                        }
                    });
                }
            });
            _.each(classes, function(c) { graph.addCell(c); });

            angular.forEach(relations, function (value, index) {
                if(!filter || showConnection(relationList, interRelationList, value[0], value[1])) {
                    var relationColor = '#4b4a67';
                    if(filter && isShortestPath(path, value)) {
                        relationColor = '#e50000';
                    }
                    arrows.push(new uml.Generalization({
                        source: { id: classes[state2class[value[0]]].id },
                        target: { id: classes[state2class[value[1]]].id },
                        attrs: {
                            '.connection': { stroke: relationColor, 'stroke-width': 2 },
                            '.marker-source': { fill: relationColor, stroke: relationColor },
                            '.marker-target': { fill: relationColor, stroke: relationColor },
                            '.marker-vertices': { display : 'none' },
                            '.marker-arrowheads': { display: 'none' },
                            '.connection-wrap': { display: 'none' },
                            '.link-tools': { display : 'none' }
                        }
                    }));
                }
            });
            _.each(arrows, function(r) { graph.addCell(r); });
        }

        drawGraph();

        function isValidState(state) {
            return !((state.inflow == 0 && state.derivativeInflow == -1) ||
                (state.volume == 0 && state.derivativeVolume == -1));
        }

        function isDefinedConnection(state1, state2) {
            var isDefined = false;
            angular.forEach(relations, function (value, index) {
                if(value.join(",") == state1 + "," + state2) {
                    isDefined = true;
                }
            });
            return isDefined;
        }

        function trace(state, derivativeInflowList) {
            var stateRelations = {};
            var newRelationsInterLevel = {};
            var reachableStates = {};
            var canReach = {};
            angular.forEach(derivativeInflowList, function (value, index) {
                stateRelations[index] = [];
                newRelationsInterLevel[index] = [];
                canReach[index] = [];
            });
            canReach[0].push(state.id);
            angular.forEach(derivativeInflowList, function (value, index) {
                toVisit = angular.copy(canReach[index]);
                var currentState = null;
                while(toVisit.length > 0) {
                    currentState = toVisit[0];
                    for(var stateItem in stateList) {
                        if(isDefinedConnection(currentState, stateList[stateItem].id)) {
                            if(stateList[stateItem].derivativeInflow == value) {
                                if(canReach[index].indexOf(stateList[stateItem].id) < 0) {
                                    canReach[index].push(stateList[stateItem].id);
                                }
                                toVisit.push(stateList[stateItem].id);
                                stateRelations[index].push([currentState, stateList[stateItem].id]);
                            }
                        }
                    }
                    var visitIndexToRemove1 = toVisit.indexOf(currentState);
                    if(visitIndexToRemove1 > -1) {
                        toVisit.splice(visitIndexToRemove1, 1);
                    }
                }
                if(canReach[index].length > 0 && index + 1 != derivativeInflowList.length) {
                    var nextValue = derivativeInflowList[index + 1];
                    for(var accessibleState in canReach[index]) {
                        accessibleState = canReach[index][accessibleState];
                        for(var stateItemId in stateList) {
                            var stateItem1 = stateList[stateItemId];
                            if(isDefinedConnection(accessibleState, stateItem1.id)) {
                                if(stateItem1.derivativeInflow == nextValue) {
                                    if(canReach[index+1].indexOf(stateItem1.id) < 0) {
                                        canReach[index+1].push(stateItem1.id);
                                    }
                                    newRelationsInterLevel[index].push([accessibleState, stateItem1.id]);
                                }
                            }
                        }
                    }
                }
                reachableStates[index] = angular.copy(canReach[index]);
            });
            return [ reachableStates, stateRelations, newRelationsInterLevel ];
        }

        function getStateObjectFromId(stateId) {
            return angular.copy(stateList[indices.indexOf(stateId)]);
        }

        function shortestPath(startState, states, relationsList, interRelationList, derivativeInflowList) {
            var output = "Starting state is " + startState.index + "\n";

            var backtrace = {};
            var m = [];
            for(var d in derivativeInflowList) {
                m.push({});
            }

            angular.forEach(derivativeInflowList, function (value, index) {
                for(var stateIndex in states[index]) {
                    m[index][states[index][stateIndex]] = limit;
                }
            });

            m[0][startState.id] = 0;

            function relationsIterator(value, index) {
                if(value[0] == nextVisit) {
                    if(m[index][value[1]] > (m[index][value[0]] + 1)) {
                        m[index][value[1]] = (m[index][value[0]] + 1);
                        backtrace[index + '-' + value[1]] = index + '-' + value[0];
                    }
                }
            }

            angular.forEach(derivativeInflowList, function (value, index) {
                toVisit = angular.copy(states[index]);
                nextVisit = toVisit[0];
                dis = limit;
                for(var visitTarget in toVisit) {
                    visitTarget = toVisit[visitTarget];
                    if(dis >= m[index][visitTarget]) {
                        dis = m[index][visitTarget];
                        nextVisit = visitTarget;
                    }
                }
                while(toVisit.length > 0) {
                    angular.forEach(relationsList[index], function (value, i) {
                        relationsIterator(value, index);
                    });
                    var visitIndexToRemove2 = toVisit.indexOf(nextVisit);
                    if(visitIndexToRemove2 > -1) {
                        toVisit.splice(visitIndexToRemove2, 1);
                    }
                    dis = limit;
                    for(var visitTarget1 in toVisit) {
                        visitTarget1 = toVisit[visitTarget1];
                        if(dis >= m[index][visitTarget1]) {
                            dis = m[index][visitTarget1];
                            nextVisit = visitTarget1;
                        }
                    }
                }
                dis = limit;
                for(var stateIndex in states[index]) {
                    stateObject = states[index][stateIndex];
                    if(dis >= m[index][stateObject]) {
                        dis = m[index][stateObject];
                        nextVisit = stateObject;
                    }
                }
                if(index + 1 != derivativeInflowList.length) {
                    d_next = derivativeInflowList[index + 1];
                    toVisit = angular.copy(states[index]);
                    while(toVisit.length > 0) {
                        for(var interRelationListItem in interRelationList[index]) {
                            interRelationListItem = interRelationList[index][interRelationListItem];
                            if(interRelationListItem[0] == nextVisit) {
                                if(m[index+1][interRelationListItem[1]] > (m[index][interRelationListItem[0]] + 1)) {
                                    m[index+1][interRelationListItem[1]] = (m[index][interRelationListItem[0]] + 1);
                                    backtrace[(index + 1) + '-' + interRelationListItem[1]] = index + '-' + interRelationListItem[0];
                                }
                            }
                        }
                        var visitIndexToRemove3 = toVisit.indexOf(nextVisit);
                        if(visitIndexToRemove3 > -1) {
                            toVisit.splice(visitIndexToRemove3, 1);
                        }
                        dis = limit;
                        for(var visitTarget2 in toVisit) {
                            visitTarget2 = toVisit[visitTarget2];
                            if(dis >= m[index][visitTarget2]) {
                                dis = m[index][visitTarget2];
                                nextVisit = visitTarget2;
                            }
                        }
                    }
                }
            });

            var lastLevelIndex = derivativeInflowList.length - 1;
            var lastLevelStates = states[lastLevelIndex];

            var terminatingStates = [];
            for(var lastLevelState in lastLevelStates) {
                lastLevelState = getStateObjectFromId(lastLevelStates[lastLevelState]);
                if(lastLevelState.derivativeInflow == 0 && lastLevelState.derivativeVolume == 0) {
                    terminatingStates.push(lastLevelState.id);
                }
            }

            var distance = limit;
            var bestTerminating = terminatingStates[0];
            if(terminatingStates.length > 0) {
                for(var terminatingState in terminatingStates) {
                    terminatingState = terminatingStates[terminatingState];
                    if(m[lastLevelIndex][terminatingState] <= distance) {
                        bestTerminating = terminatingState;
                        distance = m[lastLevelIndex][terminatingState];
                    }
                }
                output += "The closest equilibrium state (Inflow Derivative = 0, Volume Derivative = 0) is " + getStateObjectFromId(bestTerminating).index + "\n";
            } else {
                dis = limit;
                for(var lastLevelState1 in lastLevelStates) {
                    lastLevelState1 = lastLevelStates[lastLevelState1];
                    if(dis >= m[0][lastLevelState1]) {
                        dis = m[0][lastLevelState1];
                        bestTerminating = lastLevelState1;
                    }
                }
                output += "Could not reach equilibrium states, moving to the nearest state\n";
            }

            var backlist = [ bestTerminating ];
            var level = derivativeInflowList.length - 1;
            startState = startState.id;
            while(bestTerminating != startState) {
                var brkdn = backtrace[level + '-' + bestTerminating].split("-");
                k = brkdn[0];
                b = brkdn[1];
                bestTerminating = b;
                backlist.push(parseInt(bestTerminating));
                level = k;
            }
            backlist.push(startState);
            var path = angular.copy(backlist);
            path.pop();
            path.reverse();
            output += "Transition Begin\n";
            angular.forEach(path, function (value, index) {
                if(index < path.length - 1) {
                    var stateObject1 = getStateObjectFromId(path[index]);
                    var stateObject2 = getStateObjectFromId(path[index + 1]);
                    output += stateObject1.index + " -> " + stateObject2.index + "\t:\t";
                    if(stateObject1.derivativeInflow != stateObject2.derivativeInflow) {
                        output += "(" + scope.selectedInflowDerivative + ") Derivative of Inflow changed to " + displayDerivative(stateObject2.derivativeInflow) + " from " + displayDerivative(stateObject1.derivativeInflow) + "\n";
                    } else if(stateObject1.derivativeInflow == stateObject2.derivativeInflow && stateObject1.inflow != stateObject2.inflow) {
                        output += "Inflow changed to " + displayMagnitude(stateObject2.inflow) + " from " + displayMagnitude(stateObject1.inflow) + " due to the derivative at the tap (Inflow)\n";
                    } else if(stateObject1.volume < stateObject2.volume) {
                        output += "Volume increases due to the positive effect of Inflow on Volume\n";
                    } else if(stateObject1.volume > stateObject2.volume) {
                        output += "Volume decreases due to the negative effect of Outflow on Volume\n";
                    } else {
                        output += "Inflow and Outflow act ambiguously on Volume\n";
                    }
                }
            });
            output += "Transition End\n";

            return [ output, path ];
        }

        function displayMagnitude(magnitude) {
            return (magnitude == 0 ? "0" : (magnitude == 1 ? "+" : (magnitude == 2 ? "M" : "?")));
        }

        function displayDerivative(derivative) {
            return (derivative == 0 ? "0" : (derivative == 1 ? "+" : (derivative == -1 ? "-" : "?")));
        }

        function validateInput(input) {
            var message = "Validating";
            var v = input[0];
            var i = input[1];
            var valid = true;
            var volume = limit;
            var inflow = limit;
            if(v == "+") {
                volume = 1;
            } else if(v == "-") {
                valid = false;
                message = "Volume magnitude cannot be negative";
            } else if(v == "M") {
                volume = 2;
            } else if(v == "0") {
                volume = 0;
            } else {
                valid = false;
                message = "Unknown inflow value";
            }
            if(i == "+") {
                inflow = 1;
            } else if(i == "-") {
                valid = false;
                message = "Inflow magnitude cannot be negative";
            } else if(i == "M") {
                valid = false;
                message = "Inflow magnitude cannot be maximum";
            } else if(i == "0") {
                inflow = 0;
            } else {
                valid = false;
                message = "Unknown volume value";
            }
            if(i == 0 && (input[2] == "Decreasing" || input[2] == "Parabola Negative")) {
                valid = false;
                message = "Inflow cannot be zero with decreasing inflow rate";
            } else if(v == "M" && input[2] == "Increasing") {
                valid = false;
                message = "Volume cannot be maximum with increasing inflow rate";
            } else if(i == "+" && v == "M" && (input[2] == "Parabola Positive" || input[2] == "Sinusoidal")) {
                valid = false;
                message = "Volume cannot be maximum with increasing inflow rate";
            }
            if(valid) {
                return [inflow, volume];
            } else {
                return message;
            }
        }

        scope.start = function (iVolume, iInflow, iDerivative) {

            scope.showGraph = true;
            scope.showExplaination = true;

            var log = "No Inferences Made", error = "";

            var startState = newState(0, 1, 0, 0);

            var INPUT = [ iVolume, iInflow, iDerivative ];

            var inflow, volume;

            var sanitizedInputs = validateInput(INPUT);

            if(sanitizedInputs.length == 2) {
                [inflow, volume] = sanitizedInputs;

                var selectedDerivativeInflow = [];

                if(iDerivative == "Steady") {
                    selectedDerivativeInflow = [0];
                } else if(iDerivative == "Increasing") {
                    selectedDerivativeInflow = [1, 0];
                } else if(iDerivative == "Decreasing") {
                    selectedDerivativeInflow = [-1, 0];
                } else if(iDerivative == "Parabola Positive") {
                    selectedDerivativeInflow = [1, 0, -1];
                } else if(iDerivative == "Parabola Negative") {
                    selectedDerivativeInflow = [-1, 0, 1];
                } else if(iDerivative == "Sinusoidal") {
                    selectedDerivativeInflow = [1, 0, -1, 0, 1, 0];
                } else {
                    selectedDerivativeInflow = [];
                }

                derivativeInflow = selectedDerivativeInflow[0];

                if(inflow == 1 && volume == 0) {
                    derivativeVolume = 1;
                } else if(inflow == 0 && (volume == 1 || volume == 2)) {
                    derivativeVolume = -1;
                } else {
                    derivativeVolume = 0;
                }

                startState = newState(inflow, derivativeInflow, volume, derivativeVolume);

                var derivativeInflowList = [];
                derivativeInflowList = angular.copy(selectedDerivativeInflow);

                if(selectedDerivativeInflow[selectedDerivativeInflow.length-1] != 0) {
                    derivativeInflowList.push(0);
                }

                var stateList, relationList, interRelationList;

                [ stateList, relationList, interRelationList ] = trace(startState, derivativeInflowList);

                var shortestPathTrace;

                [ log, shortestPathTrace ] =  shortestPath(startState, stateList, relationList, interRelationList, derivativeInflowList);

                drawGraph(stateList, relationList, interRelationList, shortestPathTrace);

            } else {
                error = "Invalid Input\n" + sanitizedInputs;
            }

            scope.log = log.split("\n");
            scope.error = error.split("\n");
        };
    }]);
