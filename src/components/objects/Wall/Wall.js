import { 
    Mesh, 
    Vector3, 
    MeshBasicMaterial, 
    PlaneGeometry,
    FrontSide,
    Plane, 
    TextureLoader
} from 'three';

import { Global} from 'global';

class Wall extends Mesh {
  constructor(parent, x, z, width, height, hexColor, rotation) {
    // Call parent Group() constructor
    super();

    this.name = 'wall';

    // Init state
    this.state = { 
        normal: new Vector3(-x, 0, -z).normalize(),
        dist: new Vector3(x, 0, z).length(),
    }


    const textureLoader = new TextureLoader();
    let texture;
    // load a texture
    if(Math.random() > .5){
      texture = textureLoader.load(
        'https://github.com/wdrury337/TheRipening/tree/main/src/components/objects/Wall/ripe.jpg',
      );
    }
    else{
      texture = textureLoader.load(
        'https://github.com/wdrury337/TheRipening/tree/main/src/components/objects/Wall/avocadoripe.jpg',
      );
    } 

    // Create wall material 
    this.material = new MeshBasicMaterial({
      color: hexColor,
      side: FrontSide,
    });

    

    this.geometry = new PlaneGeometry(width, height);

    // Create new mesh and position wall
    this.position.set(x, height/2, z);
    this.rotation.set(rotation.x, rotation.y, rotation.z);
    parent.add(this);
    
    // Used for colision detection
    let plane = new Plane(this.state.normal, this.state.dist);
    Global.walls.push(plane);
  }
}

export default Wall;