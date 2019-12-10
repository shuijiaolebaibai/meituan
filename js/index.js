var food = [{
  "type": "A米汉堡",
  "price": 16,
  "num": 0
}, {
  "type": "杨记小厨",
  "price": 17.5,
  "num": 0
}, {
  "type": "杨铭宇黄焖鸡米饭",
  "price": 18,
  "num": 0
}, {
  "type": "烤肉拌饭",
  "price": 18,
  "num": 0
}]
//统计购物车件数
var num = 0
window.onload = function () {
  var li = document.getElementById('foods').children
  var table = document.getElementById('cart').children[0]
  for (let i = 0; i < li.length; i++) {
    li[i].lastElementChild.onclick = function () {
      num++;
      cartNum()
      food[i].num++;
      var tr = table.insertRow(-1)
      tr.insertCell(-1).innerHTML = '<input type="checkbox" onclick="cancel()"/>'
      tr.insertCell(-1).innerHTML = food[i].type;
      tr.insertCell(-1).innerHTML = food[i].price;
      tr.insertCell(-1).innerHTML = '<input type="button" onclick="subNum(this)" value=" - "><input type="text" readonly value="' + food[i].num + '" size="2"><input type="button" onclick="addNum(this)" value=" + ">'
      tr.insertCell(-1).innerHTML = '<input type="button" value="删除" onclick="deleteSelf(this)">'
      //删除重复添加的行
      var count = 0
      for (let j = 1; j < table.rows.length; j++) {
        if (table.rows[j].cells[1].innerHTML == food[i].type) {
          count++
          //修改数量的值
          table.rows[j].cells[3].children[1].value = food[i].num
          //如果重复就删除新添加的那行
          if (count == 2) {
            table.deleteRow(j)
          }
        }
      }
    }
  }
  //全选
  var checkAll = document.getElementById('all')
  checkAll.onclick = function () {
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].cells[0].children[0].checked = this.checked//获得表格第二行起的每一个复选框
    }
    delAll.disabled = !this.checked
    total()
  }
  //删除全部
  var delAll = document.getElementById('delAll')
  delAll.onclick = function () {
    var flag = confirm('确定删除所有购物车商品吗?')
    if (flag) {
      for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i)
      }
      total()
      checkAll.checked = false
      this.disabled = true
    }
  }
  //切换界面
  //切换结算界面
  var myCart = document.getElementById('myCart')
  myCart.onclick = function () {
    document.getElementById('foods').style.display = "none"
    document.getElementById('cart').style.display = "block"
  }
  //切换选购界面
  var buy = document.getElementById('toFoodView')
  buy.onclick = function () {
    document.getElementById('foods').style.display = "grid"
    document.getElementById('cart').style.display = "none"
  }
  //结算
  var account = document.getElementById('account')
  account.onclick = function () {
    var total1 = document.getElementById('total')
    for (let i = table.rows.length - 1; i > 0; i--) {
      if (table.rows[i].cells[0].children[0].checked) {
        num -= table.rows[i].cells[3].children[1].value
        alert(total1.innerHTML)
        table.deleteRow(i)
        cartNum()
        total()
        cancel()

      }
    }
  }
}
//输出购物车件数
function cartNum() {
  var cart = document.getElementById('myCart').children[0]
  cart.innerHTML = num
}
//购物车菜品数量变化
//增加
function addNum(btn) {
  var number = btn.previousElementSibling
  number.value++
  num++
  cartNum()
  total()
}
//减少
function subNum(btn) {
  var number = btn.nextElementSibling;
  number.value--
  if (number.value < 1) {
    number.value = 1
  } else {
    num--
    cartNum()
    total()
  }
}
//反选
function cancel() {
  var flag = true;
  var table = document.getElementById('cart').children[0]
  var checkAll = document.getElementById('all')
  for (let i = 1; i < table.rows.length; i++) {
    if (!table.rows[i].cells[0].children[0].checked) {
      flag = false
      break
    }
  }
  if (table.rows.length == 1) {
    flag = false
  }
  checkAll.checked = flag
  var delAll = document.getElementById('delAll')
  delAll.disabled = !flag
  total()
}
//删除单行
function deleteSelf(btn) {
  var tr = btn.parentNode.parentNode;
  var table = document.getElementById('cart').children[0]
  table.deleteRow(tr.rowIndex)
  num -= tr.cells[3].children[1].value
  cancel()
  cartNum()
  total()
}
//计算总价
function total() {
  var sum = 0
  var table = document.getElementById('cart').children[0]
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[0].children[0].checked) {
      sum += (table.rows[i].cells[2].innerHTML * table.rows[i].cells[3].children[1].value)
    }
  }
  document.getElementById('total').innerHTML = sum
}