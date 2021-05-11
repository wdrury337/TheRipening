// Room adapted from https://github.com/MichaelF49/Pacman3D/blob/master/src/objects/Room.js

import { Group } from 'three';
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

import { Global } from 'global';

class Floor extends Group {
  constructor(parent, arenaSize, hexColor) {
    // Call parent Group() constructor
    super();

    this.name = 'floor';

    // Create floor geometry and material
    const floorGeo = new PlaneGeometry(arenaSize, arenaSize);
    const floorMaterial = new MeshBasicMaterial({
      color: 0xfdf0c4,
      side: DoubleSide,
    });

    const floor = new Mesh(floorGeo, floorMaterial);
    floor.rotation.x = Math.PI/2;
    
    parent.add(floor);
  }
}

export default Floor;