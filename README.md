[transferir.htm](https://github.com/user-attachments/files/29508316/transferir.htm)<!DOCTYPE html>

<html dir="ltr" lang="pt">

<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<meta name="google" value="notranslate">

<script>
function addRow(name, url, isdir,
    size, size_string, date_modified, date_modified_string) {
  if (name == "." || name == "..")
    return;

  var root = document.location.pathname;
  if (root.substr(-1) !== "/")
    root += "/";

  var tbody = document.getElementById("tbody");
  var row = document.createElement("tr");
  var file_cell = document.createElement("td");
  var link = document.createElement("a");

  link.className = isdir ? "icon dir" : "icon file";

  if (isdir) {
    name = name + "/";
    url = url + "/";
    size = 0;
    size_string = "";
  } else {
    link.draggable = "true";
    link.addEventListener("dragstart", onDragStart, false);
  }
  link.innerText = name;
  link.href = root + url;

  file_cell.dataset.value = name;
  file_cell.appendChild(link);

  row.appendChild(file_cell);
  row.appendChild(createCell(size, size_string));
  row.appendChild(createCell(date_modified, date_modified_string));

  tbody.appendChild(row);
}

function onDragStart(e) {
  var el = e.srcElement;
  var name = el.innerText.replace(":", "");
  var download_url_data = "application/octet-stream:" + name + ":" + el.href;
  e.dataTransfer.setData("DownloadURL", download_url_data);
  e.dataTransfer.effectAllowed = "copy";
}

function createCell(value, text) {
  var cell = document.createElement("td");
  cell.setAttribute("class", "detailsColumn");
  cell.dataset.value = value;
  cell.innerText = text;
  return cell;
}

function start(location) {
  var header = document.getElementById("header");
  header.innerText = header.innerText.replace("LOCATION", location);

  document.getElementById("title").innerText = header.innerText;
}

function onHasParentDirectory() {
  var box = document.getElementById("parentDirLinkBox");
  box.style.display = "block";

  var root = document.location.pathname;
  if (!root.endsWith("/"))
    root += "/";

  var link = document.getElementById("parentDirLink");
  link.href = root + "..";
}

function sortTable(column) {
  var theader = document.getElementById("theader");
  var oldOrder = theader.cells[column].dataset.order || '1';
  oldOrder = parseInt(oldOrder, 10)
  var newOrder = 0 - oldOrder;
  theader.cells[column].dataset.order = newOrder;

  var tbody = document.getElementById("tbody");
  var rows = tbody.rows;
  var list = [], i;
  for (i = 0; i < rows.length; i++) {
    list.push(rows[i]);
  }

  list.sort(function(row1, row2) {
    var a = row1.cells[column].dataset.value;
    var b = row2.cells[column].dataset.value;
    if (column) {
      a = parseInt(a, 10);
      b = parseInt(b, 10);
      return a > b ? newOrder : a < b ? oldOrder : 0;
    }

    // Column 0 is text.
    if (a > b)
      return newOrder;
    if (a < b)
      return oldOrder;
    return 0;
  });

  // Appending an existing child again just moves it.
  for (i = 0; i < list.length; i++) {
    tbody.appendChild(list[i]);
  }
}

// Add event handlers to column headers.
function addHandlers(element, column) {
  element.onclick = (e) => sortTable(column);
  element.onkeydown = (e) => {
    if (e.key == 'Enter' || e.key == ' ') {
      sortTable(column);
      e.preventDefault();
    }
  };
}

function onLoad() {
  addHandlers(document.getElementById('nameColumnHeader'), 0);
  addHandlers(document.getElementById('sizeColumnHeader'), 1);
  addHandlers(document.getElementById('dateColumnHeader'), 2);
}

window.addEventListener('DOMContentLoaded', onLoad);
</script>

<style>

  h1 {
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
  }

  table {
    border-collapse: collapse;
  }

  th {
    cursor: pointer;
  }

  td.detailsColumn {
    padding-inline-start: 2em;
    text-align: end;
    white-space: nowrap;
  }

  a.icon {
    padding-inline-start: 1.5em;
    text-decoration: none;
    user-select: auto;
  }

  a.icon:hover {
    text-decoration: underline;
  }

  a.file {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABEElEQVR42nRRx3HDMBC846AHZ7sP54BmWAyrsP588qnwlhqw/k4v5ZwWxM1hzmGRgV1cYqrRarXoH2w2m6qqiqKIR6cPtzc3xMSML2Te7XZZlnW7Pe/91/dX47WRBHuA9oyGmRknzGDjab1ePzw8bLfb6WRalmW4ip9FDVpYSWZgOp12Oh3nXJ7nxoJSGEciteP9y+fH52q1euv38WosqA6T2gGOT44vry7BEQtJkMAMMpa6JagAMcUfWYa4hkkzAc7fFlSjwqCoOUYAF5RjHZPVCFBOtSBGfgUDji3c3jpibeEMQhIMh8NwshqyRsBJgvF4jMs/YlVR5KhgNpuBLzk0OcUiR3CMhcPaOzsZiAAA/AjmaB3WZIkAAAAASUVORK5CYII=") left top no-repeat;
  }

  a.dir {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVR42oxStZoWQRCs2cXdHTLcHZ6EjAwnQWIkJyQlRt4Cd3d3d1n5d7q7ju1zv/q+mh6taQsk8fn29kPDRo87SDMQcNAUJgIQkBjdAoRKdXjm2mOH0AqS+PlkP8sfp0h93iu/PDji9s2FzSSJVg5ykZqWgfGRr9rAAAQiDFoB1OfyESZEB7iAI0lHwLREQBcQQKqo8p+gNUCguwCNAAUQAcFOb0NNGjT+BbUC2YsHZpWLhC6/m0chqIoM1LKbQIIBwlTQE1xAo9QDGDPYf6rkTpPc92gCUYVJAZjhyZltJ95f3zuvLYRGWWCUNkDL2333McBh4kaLlxg+aTmyL7c2xTjkN4Bt7oE3DBP/3SRz65R/bkmBRPGzcRNHYuzMjaj+fdnaFoJUEdTSXfaHbe7XNnMPyqryPcmfY+zURaAB7SHk9cXSH4fQ5rojgCAVIuqCNWgRhLYLhJB4k3iZfIPtnQiCpjAzeBIRXMA6emAqoEbQSoDdGxFUrxS1AYcpaNbBgyQBGJEOnYOeENKR/iAd1npusI4C75/c3539+nbUjOgZV5CkAU27df40lH+agUdIuA/EAgDmZnwZlhDc0wAAAABJRU5ErkJggg==") left top no-repeat;
  }

  a.up {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42myTA+w1RxRHz+zftmrbdlTbtq04qRGrCmvbDWp9tq3a7tPcub8mj9XZ3eHOGQdJAHw77/LbZuvnWy+c/CIAd+91CMf3bo+bgcBiBAGIZKXb19/zodsAkFT+3px+ssYfyHTQW5tr05dCOf3xN49KaVX9+2zy1dX4XMk+5JflN5MBPL30oVsvnvEyp+18Nt3ZAErQMSFOfelCFvw0HcUloDayljZkX+MmamTAMTe+d+ltZ+1wEaRAX/MAnkJdcujzZyErIiVSzCEvIiq4O83AG7LAkwsfIgAnbncag82jfPPdd9RQyhPkpNJvKJWQBKlYFmQA315n4YPNjwMAZYy0TgAweedLmLzTJSTLIxkWDaVCVfAbbiKjytgmm+EGpMBYW0WwwbZ7lL8anox/UxekaOW544HO0ANAshxuORT/RG5YSrjlwZ3lM955tlQqbtVMlWIhjwzkAVFB8Q9EAAA3AFJ+DR3DO/Pnd3NPi7H117rAzWjpEs8vfIqsGZpaweOfEAAFJKuM0v6kf2iC5pZ9+fmLSZfWBVaKfLLNOXj6lYY0V2lfyVCIsVzmcRV9Y0fx02eTaEwhl2PDrXcjFdYRAohQmS8QEFLCLKGYA0AeEakhCCFDXqxsE0AQACgAQp5w96o0lAXuNASeDKWIvADiHwigfBINpWKtAXJvCEKWgSJNbRvxf4SmrnKDpvZavePu1K/zu/due1X/6Nj90MBd/J2Cic7WjBp/jUdIuA8AUtd65M+PzXIAAAAASUVORK5CYII=") left top no-repeat;
  }

  html[dir=rtl] a {
    background-position-x: right;
  }

  #parentDirLinkBox {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
</style>

<title id="title"></title>

</head>

<body>

<h1 id="header">Índice de LOCATION</h1>

<div id="parentDirLinkBox" style="display:none">
  <a id="parentDirLink" class="icon up">
    <span id="parentDirText">[directório principal]</span>
  </a>
</div>

<table>
  <thead>
    <tr class="header" id="theader">
      <th id="nameColumnHeader" tabindex=0 role="button">Nome</th>
      <th id="sizeColumnHeader" class="detailsColumn" tabindex=0 role="button">
        Tamanho
      </th>
      <th id="dateColumnHeader" class="detailsColumn" tabindex=0 role="button">
        Data modificada
      </th>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>

</body>

</html>
<script>// Copyright 2012 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";var loadTimeData;class LoadTimeData{constructor(){this.data_=null}set data(value){expect(!this.data_,"Re-setting data.");this.data_=value}valueExists(id){return id in this.data_}getValue(id){expect(this.data_,"No data. Did you remember to include strings.js?");const value=this.data_[id];expect(typeof value!=="undefined","Could not find value for "+id);return value}getString(id){const value=this.getValue(id);expectIsType(id,value,"string");return value}getStringF(id,var_args){const value=this.getString(id);if(!value){return""}const args=Array.prototype.slice.call(arguments);args[0]=value;return this.substituteString.apply(this,args)}substituteString(label,var_args){const varArgs=arguments;return label.replace(/\$(.|$|\n)/g,(function(m){expect(m.match(/\$[$1-9]/),"Unescaped $ found in localized string.");return m==="$$"?"$":varArgs[m[1]]}))}getBoolean(id){const value=this.getValue(id);expectIsType(id,value,"boolean");return value}getInteger(id){const value=this.getValue(id);expectIsType(id,value,"number");expect(value===Math.floor(value),"Number isn't integer: "+value);return value}overrideValues(replacements){expect(typeof replacements==="object","Replacements must be a dictionary object.");for(const key in replacements){this.data_[key]=replacements[key]}}}function expect(condition,message){if(!condition){throw new Error("Unexpected condition on "+document.location.href+": "+message)}}function expectIsType(id,value,type){expect(typeof value===type,"["+value+"] ("+id+") is not a "+type)}expect(!loadTimeData,"should only include this file once");loadTimeData=new LoadTimeData;window.loadTimeData=loadTimeData;console.warn("crbug/1173575, non-JS module files deprecated.");</script><script>loadTimeData.data = {"header":"Índice de LOCATION","headerDateModified":"Data modificada","headerName":"Nome","headerSize":"Tamanho","language":"pt","parentDirText":"[directório principal]","textdirection":"ltr"};</script><script>start("C:\\Users\\mildi\\AppData\\Local\\packages\\Claude_pzs8sxrjxfjjc\\LocalCache\\Roaming\\Claude\\local-agent-mode-sessions\\5243f4ae-3df7-4d30-af66-cb110e033032\\74c632d5-e89c-4410-a942-0baf2ef9374b\\local_8f849cd5-d375-4c7b-84fb-771c28bd819c\\outputs\\");</script>
<script>onHasParentDirectory();</script>
<script>addRow("deploy","deploy",1,0,"0 B",1782741038,"29/06/26, 10:50:38");</script>
<script>addRow("import","import",1,0,"0 B",1781899420,"19/06/26, 17:03:40");</script>
<script>addRow("apple-touch-icon.png","apple-touch-icon.png",0,7800,"7.6 kB",1781375821,"13/06/26, 15:37:01");</script>
<script>addRow("firestore.rules","firestore.rules",0,3360,"3.3 kB",1781632201,"16/06/26, 14:50:01");</script>
<script>addRow("gestao_equipe.html","gestao_equipe.html",0,24162,"23.6 kB",1781191221,"11/06/26, 12:20:21");</script>
<script>addRow("GUIA_DE_CONFIGURACAO.md","GUIA_DE_CONFIGURACAO.md",0,15643,"15.3 kB",1781552956,"15/06/26, 16:49:16");</script>
<script>addRow("icon-192.png","icon-192.png",0,8564,"8.4 kB",1781375821,"13/06/26, 15:37:01");</script>
<script>addRow("icon-512-maskable.png","icon-512-maskable.png",0,26256,"25.6 kB",1781375821,"13/06/26, 15:37:01");</script>
<script>addRow("icon-512.png","icon-512.png",0,34976,"34.2 kB",1781375821,"13/06/26, 15:37:01");</script>
<script>addRow("importar_alberto_donha.js","importar_alberto_donha.js",0,2247,"2.2 kB",1781563036,"15/06/26, 19:37:16");</script>
<script>addRow("importar_clientes_2026.js","importar_clientes_2026.js",0,15091,"14.7 kB",1781565312,"15/06/26, 20:15:12");</script>
<script>addRow("index_deploy.html","index_deploy.html",0,223030,"218 kB",1782741777,"29/06/26, 11:02:57");</script>
<script>addRow("index_fixed.html","index_fixed.html",0,124469,"122 kB",1781553426,"15/06/26, 16:57:06");</script>
<script>addRow("index.html","index.html",0,219864,"215 kB",1782505001,"26/06/26, 17:16:41");</script>
<script>addRow("logo.png","logo.png",0,65448,"63.9 kB",1781219758,"11/06/26, 20:15:58");</script>
<script>addRow("manifest.json","manifest.json",0,757,"757 B",1781375850,"13/06/26, 15:37:30");</script>
<script>addRow("migrar_boletos.js","migrar_boletos.js",0,1781,"1.7 kB",1781566175,"15/06/26, 20:29:35");</script>
<script>addRow("site_pwa_fixed.zip","site_pwa_fixed.zip",0,159543,"156 kB",1781380322,"13/06/26, 16:52:02");</script>
<script>addRow("site_pwa_v10.zip","site_pwa_v10.zip",0,165139,"161 kB",1781549493,"15/06/26, 15:51:33");</script>
<script>addRow("site_pwa_v11.zip","site_pwa_v11.zip",0,165748,"162 kB",1781552818,"15/06/26, 16:46:58");</script>
<script>addRow("site_pwa_v12.zip","site_pwa_v12.zip",0,166436,"163 kB",1781553442,"15/06/26, 16:57:22");</script>
<script>addRow("site_pwa_v4_new.zip","site_pwa_v4_new.zip",0,0,"0 B",1781382795,"13/06/26, 17:33:15");</script>
<script>addRow("site_pwa_v4.zip","site_pwa_v4.zip",0,162897,"159 kB",1781382804,"13/06/26, 17:33:24");</script>
<script>addRow("site_pwa_v5.zip","site_pwa_v5.zip",0,163159,"159 kB",1781384742,"13/06/26, 18:05:42");</script>
<script>addRow("site_pwa_v6.zip","site_pwa_v6.zip",0,163533,"160 kB",1781385131,"13/06/26, 18:12:11");</script>
<script>addRow("site_pwa_v7.zip","site_pwa_v7.zip",0,163985,"160 kB",1781388602,"13/06/26, 19:10:02");</script>
<script>addRow("site_pwa_v8.zip","site_pwa_v8.zip",0,163979,"160 kB",1781388931,"13/06/26, 19:15:31");</script>
<script>addRow("site_pwa_v9.zip","site_pwa_v9.zip",0,164472,"161 kB",1781548298,"15/06/26, 15:31:38");</script>
<script>addRow("site_pwa.zip","site_pwa.zip",0,159281,"156 kB",1781375934,"13/06/26, 15:38:54");</script>
<script>addRow("site.zip","site.zip",0,85461,"83.5 kB",1781263927,"12/06/26, 08:32:07");</script>
<script>addRow("site2.zip","site2.zip",0,88387,"86.3 kB",1781270033,"12/06/26, 10:13:53");</script>
<script>addRow("storage.rules","storage.rules",0,253,"253 B",1781215611,"11/06/26, 19:06:51");</script>
<script>addRow("sw.js","sw.js",0,2219,"2.2 kB",1781375878,"13/06/26, 15:37:58");</script>
<script>addRow("synctest.txt","synctest.txt",0,20,"20 B",1781382550,"13/06/26, 17:29:10");</script>
<script>addRow("test_card.png","test_card.png",0,639,"639 B",1781549633,"15/06/26, 15:53:53");</script>
<script>addRow("teste-anexo.txt","teste-anexo.txt",0,30,"30 B",1782136737,"22/06/26, 10:58:57");</script>
<script>addRow("writetest.txt","writetest.txt",0,21,"21 B",1781273020,"12/06/26, 11:03:40");</script>
<script>addRow("zid4ZVJl","zid4ZVJl",0,163979,"160 kB",1781388926,"13/06/26, 19:15:26");</script>
<script>addRow("zipqtEyN","zipqtEyN",0,159281,"156 kB",1781375928,"13/06/26, 15:38:48");</script>
<script>addRow("ziPu4ftV","ziPu4ftV",0,162897,"159 kB",1781382796,"13/06/26, 17:33:16");</script>
<script>addRow("ziX3cybv","ziX3cybv",0,162897,"159 kB",1781382789,"13/06/26, 17:33:09");</script>

