// if every path starts from (0, 0) which is it's own centre... use transforms in shape to set position
const vizraPaths = {
	
	// can we make circle so it has width height, rather than radius?
	circle: function(radius = 100, arcFrom = 0, arcTo = 360) {
		let radFrom = vizraUtils.degToRad(arcFrom);
		let radTo = vizraUtils.degToRad(arcTo);
		
		const circlePath = new Path2D();
		circlePath.arc(0, 0, radius, radFrom, radTo);

		return circlePath;
	},
	
	rectangle: function(width = 100, height = 100) {
		const rectPath = new Path2D();
		// outline
		rectPath.moveTo( width/2, height/2 );
		rectPath.lineTo( -width/2, height/2 );
		rectPath.lineTo( -width/2, -height/2 );
		rectPath.lineTo( width/2, -height/2 );
		rectPath.closePath();
		
		return rectPath;
	},
	
	cross: function(width = 100, height = 100, thickness = 5) {
		
		const halfThickness = thickness/2;
		
		const xPath = new Path2D();
		xPath.moveTo(-halfThickness, -(height/2));
		xPath.lineTo(-halfThickness, -halfThickness);
		xPath.lineTo(-(width/2)-halfThickness, -halfThickness);
		xPath.lineTo(-(width/2)-halfThickness, halfThickness);
		xPath.lineTo(-halfThickness, halfThickness);
		xPath.lineTo(-halfThickness, (height/2));
		xPath.lineTo(halfThickness, (height/2));
		xPath.lineTo(halfThickness, halfThickness);
		xPath.lineTo((width/2), halfThickness);
		xPath.lineTo((width/2), -halfThickness);
		xPath.lineTo(halfThickness, -halfThickness);
		xPath.lineTo(halfThickness, -(height/2));
		xPath.closePath();
		
		return xPath;
	},
	
	diamond: function(style = 'plain', width = 100, height = 100) {

		// outline
		const diaPath = new Path2D();
		// context.rect(x, y, size, size);
		diaPath.lineTo(width/2, height/2);
		diaPath.lineTo(0, height);
		diaPath.lineTo(-width/2, height/2);
		diaPath.lineTo(0, 0);

		if (style === 'grid' || style === 'sliced') {
			// grid lines
			diaPath.moveTo(width/4, height/4);
			diaPath.lineTo(-(width/4), height*0.75);
			diaPath.moveTo(-(width/4), height/4);
			diaPath.lineTo(width/4, height*0.75);

			if (style === 'sliced') {
				// diagonal lines
				diaPath.moveTo(0, 0);
				diaPath.lineTo(0, height);
				diaPath.moveTo(-(width/2), height/2);
				diaPath.lineTo(width/2, height/2);
			}
		}
		diaPath.closePath();
	
		return diaPath;
	},
	
	lantern: function(insideLines = true, width = 100, height = 100) {
		
		// context.translate(position.x-(186*width), position.y-(150*height));
		context.translate(x-113.75-35, y-8-35);
		// context.scale(width, height);
		const lanternPath = new Path2D();		
		lanternPath.moveTo(186,44);
		lanternPath.bezierCurveTo(186,24,150,28,150,8);
		lanternPath.bezierCurveTo(150,28,114,24,114,44);
		lanternPath.bezierCurveTo(114,64,150,60,150,80);
		lanternPath.bezierCurveTo(150,60,186,64,186,44);
		lanternPath.closePath();

		if (insideLines) {
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,120,28,120,48);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,128,32,128,52);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,136,38,136,58);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,144,42,144,62);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,180,28,180,48);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,172,32,172,52);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,164,38,164,58);
			lanternPath.stroke();
			lanternPath.beginPath();
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,156,42,156,62);
			lanternPath.stroke();
		}
		
		return lanternPath;
	}
	
}

export default vizraPaths;
