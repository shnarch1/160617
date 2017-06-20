class Popup{
	constructor(content_url=null){
		this.content_url = content_url;
	}

	build(){
		this.buildBody();
		this.importContnet();
	}

	buildBody(){
		this.popup_container = $("<div>", {id: "popup-container", 
										click:function(e){
											if(e.target.id === "popup-container"){
												this.remove();
											}
										}.bind(this)});

		var popup = $("<div>", {id: "popup"}).appendTo(this.popup_container);
		
		var del_btn = $("<button>", {id:"del_btn",
									 text:"✘",
									 click:function(e){
									 	if(e.target.id === "del_btn"){
									 		this.remove();
									 	}
									 }.bind(this)}).appendTo(popup);
		var popup_content = $("<div>", {id: "popup-content"}).appendTo(popup)

		this.popup_container.appendTo('body');

		$(document).keydown(function(e) {
			if (e.keyCode == 27){
				this.remove();
			}
		}.bind(this));
	}

	remove(){
		this.popup_container.remove();
	}

	importContnet(){
		fetch(this.content_url)
			.then(function(response){
				return response.text();})
			.then(function(html){
				this.popup_container.find('#popup-content').append(html);
			}.bind(this))
			.then(function(){
				this.popup_container.find('#popup-content form').submit(function(e){
					var form = this.popup_container.find('#popup-content form');
					e.preventDefault();
					var data = new FormData();
					data.append( 'email', form[0][0].value);
					data.append( 'pass', form[0][1].value);
					fetch('server.php',{method:"POST",body:data})
					.then(function(response){
						if (response.status === 201){
							this.remove();
						}
						else{
							this.error();
						}
					}.bind(this))
				}.bind(this))
			}.bind(this))
	}

	error(){
		$("<p>", {id: 'err-msg', text:"error"})
			.appendTo(this.popup_container.find('#popup-content form'));
	}

}

class delayedPopup extends Popup{
	constructor(content_url=null){
		super(content_url);
	}

	build(){
		setTimeout(function(){ 
			this.buildBody()
			this.importContnet()}.bind(this), 1000);
	}
}

// popup = new Popup('form.html');
// popup.build();

var popup = new delayedPopup('form.html');
popup.build();