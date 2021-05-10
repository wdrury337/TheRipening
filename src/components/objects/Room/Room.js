// Room adapted from https://github.com/MichaelF49/Pacman3D/blob/master/src/objects/Room.js

import { Box3, Vector3, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

import { Global} from '../../../global';

class Room {
  constructor(parent, x, z, arenaSize, hexColor, sides) {
    // setting id of room, to be used for pathing algorithm
    this.id = 'roomName';

    // possibly also used for defining the characteristics of the room
    this.unlocked = false;
    this.minX = x - arenaSize / 2;
    this.maxX = x + arenaSize / 2;
    this.minZ = z - arenaSize / 2;
    this.maxZ = z + arenaSize / 2;

    /** ********************************************************
     * FLOOR
     ******************************************************** */
    const floorGeo = new PlaneGeometry(arenaSize, arenaSize, 10, 10);
    const floorMaterial = new MeshBasicMaterial({
      color: 0xfdf0c4,
      side: DoubleSide,
      reflectivity: 0.01,
      wireframe: false,
      transparent: false,
      opacity: 0,
    });
    const floor = new Mesh(floorGeo, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -2;
    floor.position.x = x;
    floor.position.z = z;
    parent.add(floor);

    /** ********************************************************
     * WALLS
     ******************************************************** */
    const wallMaterial = new MeshBasicMaterial({
      color: hexColor,
      side: DoubleSide,
      wireframe: true,
      transparent: false,
      opacity: 1.0,
    });

    let wall;

    const wallGeo = new PlaneGeometry(arenaSize, 75, 75, 10);

    // Adds a wall to the scene depending on which walls are permitted.
    if (sides.up) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.rotation.y = Math.PI / 2;
      wall.position.y = 7.5;
      wall.position.x = x + arenaSize / 2;
      wall.position.z = z;
      parent.add(wall);
      let v1 = new Vector3(wall.position.x, wall.position.y - 100, z - arenaSize/2);
      let v2 = new Vector3(wall.position.x + .1, wall.position.y + 100, z + arenaSize/2);


      Global.walls.push(new Box3(v1, v2));  
    }

    if (sides.down) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.rotation.y = Math.PI / 2;
      wall.position.y = 7.5;
      wall.position.x = x - arenaSize / 2;
      wall.position.z = z;
      parent.add(wall);
      let v1 = new Vector3(wall.position.x, wall.position.y - 100, z - arenaSize/2);
      let v2 = new Vector3(wall.position.x +.1, wall.position.y + 100, z + arenaSize/2);


      Global.walls.push(new Box3(v1, v2));  
    }

    if (sides.left) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.position.y = 7.5;
      wall.position.z = z - arenaSize / 2;
      wall.position.x = x;
      parent.add(wall);
      let v1 = new Vector3(x - arenaSize/2, wall.position.y-100, wall.position.z);
      let v2 = new Vector3(x + arenaSize/2, wall.position.y + 100, wall.position.z + .1);


      Global.walls.push(new Box3(v1, v2));  
    }

    if (sides.right) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.position.y = 7.5;
      wall.position.z = z + arenaSize / 2;
      wall.position.x = x;
      parent.add(wall);
      let v1 = new Vector3(x - arenaSize/2, wall.position.y-100, wall.position.z);
      let v2 = new Vector3(x + arenaSize/2, wall.position.y + 100, wall.position.z + .1);


      Global.walls.push(new Box3(v1, v2));  
    }
  }

  isInside(position) {
    if (
      position.x >= this.minX &&
      position.x <= this.maxX &&
      position.z <= this.maxZ &&
      position.z >= this.minZ
    ) {
      return true;
    }
    return false;
  }
}

export default Room;