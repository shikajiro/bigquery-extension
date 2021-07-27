// @ts-ignore
import * as Plotly from "plotly.js-strict-dist-min";

let showedGraph = false;

export const extendGraph = () => {
    if (document.querySelector('.graph-button') == null) {
        let panActionBarRight = document.querySelector('md-toolbar[aria-labelledby=action-bar-2] pan-action-bar-right');
        let graphButton: HTMLElement = <HTMLElement>panActionBarRight.querySelector('pan-action-bar-button').cloneNode(true);
        graphButton.className = "graph-button";
        graphButton.querySelector('span').textContent = "グラフ";
        graphButton.addEventListener("click", onGraphButtonClick);
        panActionBarRight.prepend(graphButton);
    }

    if (document.querySelectorAll('bq-results-table th .YGraph').length === 0) {
        document.querySelectorAll('bq-results-table th')
            .forEach((row) => {
                if (row.getAttribute("ng-repeat")) {
                    let select = document.createElement("select");
                    select.className = "YGraph";
                    select.name = "YGraph";
                    row.append(select);

                    let empty = document.createElement("option");
                    empty.value = "empty";
                    empty.label = "-----";
                    select.append(empty);

                    let optionMarker = document.createElement("option");
                    optionMarker.value = "markers";
                    optionMarker.label = "marker";
                    select.append(optionMarker);

                    let optionLine = document.createElement("option");
                    optionLine.value = "lines";
                    optionLine.label = "line";
                    select.append(optionLine);

                    let optionX = document.createElement("option");
                    optionX.value = "x";
                    optionX.label = "x";
                    select.append(optionX);
                }
            })

        document.querySelectorAll('bq-results-table th .YGraph')
            .forEach((row) => {
                row.addEventListener("change", () => {
                    if (showedGraph) {
                        updateGraph();
                    }
                })
            })

    }
}

function onGraphButtonClick() {
    console.log("GraphButton clicked");
    showedGraph = !showedGraph;

    // グラフの追加or削除
    if (showedGraph) {
        updateGraph();
    } else {
        document.querySelector(".js-plotly-plot")?.remove();
    }

    // クエリエディタの表示切り替え
    document.querySelector('bq-query-panel')
        .setAttribute("style", `visibility: ${showedGraph ? 'hidden' : ''};`);
}

function showGraph(
    xLineMap: { [index: number]: HTMLOptionElement },
    yLinesIntMap: { [index: number]: HTMLOptionElement }) {
    let keys = Object.keys(xLineMap)
    let xLine: NodeList;
    if (keys.length > 0) {
        xLine = document.querySelectorAll(`bq-results-table td:nth-of-type(${keys[0] + 2}) div`);
    } else {
        xLine = document.querySelectorAll(`bq-results-table td:nth-of-type(1)`);
    }
    let xList = [...xLine].map((row) => row.textContent);

    //要素を取得する処理
    let data = [];
    for (let [_index, option] of Object.entries(yLinesIntMap)) {
        let index = parseInt(_index)
        data.push({
            mode: option.value,
            type: "scatter",
            name: document.querySelector(`bq-results-table th:nth-of-type(${index + 2})`)
                .textContent.trim(),
            x: xList,
            y: [...document.querySelectorAll(`bq-results-table td:nth-of-type(${index + 2}) div`)]
                .map((row) => row.textContent)
        });
    }

    let plotly = document.createElement("div")
    Plotly.newPlot(
        plotly,
        data,
        {margin: {t: 0}}
    )
    return plotly
}

function updateGraph() {
    let yIndexList: { [index: number]: HTMLOptionElement } = {};
    let xIndex: { [index: number]: HTMLOptionElement } = {};

    document.querySelectorAll('bq-results-table th .YGraph')
        .forEach((row: HTMLSelectElement, index: number) => {
            let selectedOption = row.selectedOptions[0];
            if (selectedOption.value === "x") {
                xIndex[index] = selectedOption;
            } else if (row.selectedIndex > 0) {
                yIndexList[index] = selectedOption;
            }
        })
    let plotly = showGraph(xIndex, yIndexList);
    document.querySelector(".js-plotly-plot")?.remove();
    document.querySelector('bq-query-panel').parentNode.prepend(plotly);
}
