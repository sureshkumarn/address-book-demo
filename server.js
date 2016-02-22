var http=require("http"),
	app=require("./app")();

http.createServer(app).listen(app.get("port"), function(){
	console.log("Express server is running on port :" + app.get("port"));
});