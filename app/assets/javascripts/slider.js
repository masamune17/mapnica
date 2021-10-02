// まずinput要素を取得// input要素
const inputElem = document.getElementById('example');

// 埋め込む先の要素
const currentValueElem = document.getElementById('current-value');

// 現在の値を埋め込む関数
const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
}

// inputイベント時に値をセットする関数
const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

window.onload = () => {
  // 変更に合わせてイベントを発火する
  inputElem.addEventListener('input', rangeOnChange);
  // ページ読み込み時の値をセット
  setCurrentValue(inputElem.value);
}
