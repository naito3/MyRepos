$(function(){

	// テーブルを表示する
	function renderTable(data){
		var $table = $('#shop');
		$table.find('tr').remove(':not(:first-child)');
		$(data).each(function(){
			var shop = this;

			var $name = $('<td></td>').text(shop.name);
			var $address = $('<td></td>').text(shop.address);
			var $tel = $('<td></td>').text(shop.tel);
			var $solar = $('<td></td>').html(getImage('solar', shop.solar));
			var $kids = $('<td></td>').html(getImage('kids', shop.kids));
			var $natural = $('<td></td>').html(getImage('natural', shop.natural));

			$('<tr></tr>')
			.append($name)
			.append($address)
			.append($tel)
			.append($solar)
			.append($kids)
2			.append($natural)
			.appendTo('$table');
		});
	}

	// 画像を返す
	function getImage(type, number){
		var num = parseInt(number);
		var suffix = '';
		if(num){
			suffix = 'yes';
		} else {
			suffix = 'no';
		}
		var fileName = type + '-' + suffix + '.png';
		var path = 'images/' + fileName;
		return $('<img>').attr('src', path);
	}

	// データをロードする
	var shopdata;
	$.get('shopdata.json', function(data){
		shopdata = data;
		renderTable(shopdata);
//		console.log(shopdata);
	})
	.fail(function(){
		alert('店舗データをダウンロードできませんでした。しばらく経ってからまたお試しください。');
	});

	// フィルタした結果の新たなデータを作成して返す
	function filterData(data, filterName){
		var newData = [];
		$(data).each(function(){
			var currentData = this;
			var num = parseInt(currentData[filterName]);
			if(num == 1){
				newData.push(currentData);
			}
		});
		return newData;
	}

	// データをフィルタする
	$('.filter-btn')
	.on('click', 'li > a', function(event){
		event.preventDefault();
		var $this = $(this);

		// ボタンのアピアランスを変更する
		$this.parent().siblings()
		.addClass('off')
		.end()
		.removeClass('off');

		var idName = $this.parent().attr('id');
		if(idName = 'all'){
			renderTable(shopdata);
		} else {
			var newData = filterData(shopdata, idName);
			renderTable(newData);
		}
	});
});
