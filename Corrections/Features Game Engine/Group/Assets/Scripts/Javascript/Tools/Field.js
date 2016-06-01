function Field(position,mass) {
	this.position = position;
	this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
	this.mass = mass || 50;
	this.drawColor = this.mass < 0 ? "#f00": "#0f0";
};