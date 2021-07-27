import * as d3 from 'd3';

/**
 * クエリ結果の色情報を拡張する
 */

export const extendColor = () => {

    // BigQueryのテーブルに表示されている画像URLをサムネイル表示する
    document.querySelectorAll('bq-results-table td div')
        .forEach((row) => {
            let url = row.textContent;
            //httpで始まらず画像拡張子で終わらないデータはskip
            if (!url.match(/^http.*(jpg|jpeg|gif|png)$/)) {
                console.log("this is not image url");
                return;
            }
            //既に表示している場合はskip
            if (row.querySelector("img")) {
                console.log("img exist");
                return;
            }

            let img = document.createElement("img");
            img.width = 200;
            img.src = url;
            row.append(
                document.createElement("br"),
                img
            );
        })

    // labをrgbに変換して文字列として表示
    let labIndex = [...document.querySelectorAll('bq-results-table th')]
        .findIndex((head) => head.textContent.trim() === "lab")

    if (0 <= labIndex) {
        document.querySelectorAll(`bq-results-table td:nth-of-type(${labIndex + 1}) div`)
            .forEach((row) => {
                let [l, a, b] = row.textContent.split(",").map(n => parseInt(n));
                row.append(
                    document.createElement("br"),
                    document.createTextNode(d3.lab(l, a, b).rgb().formatHex())
                );
            });
    }

    // #ではじまるRGBカラーの背景に色を塗る
    document.querySelectorAll('bq-results-table td')
        .forEach((row) => {
            //#で始まり6桁の数値化か文字列（完璧な正規表現ではない）
            let res = row.textContent.match(/#.{6}/);
            if (!res) {
                console.log("this is not rgb");
                return;
            }
            row.setAttribute("style", `background-color:${res};`);
        });
}
