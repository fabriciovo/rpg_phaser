import 'phaser';
import firebase from "firebase/app";
import TitleScene from '../src/scenes/TitleScene';
import BootScene from '../src/scenes/BootScene';
import GameScene from '../src/scenes/GameScene';
import LoadingScene from '../src/scenes/LoadingScene';
import Inventory from './inventory/Inventory';


let titleScene = new TitleScene();
let bootScene = new BootScene();
let gameScene = new GameScene();
let loadingScene = new LoadingScene();


let config = {
    type: Phaser.AUTO,
    width: 320,
    height: 630,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

} 
var firebaseConfig = {
    apiKey: "AIzaSyDCEZUmGZolpVypl1qYw7ck_KMI6-VFtzQ",
    authDomain: "afkinghts.firebaseapp.com",
    databaseURL: "https://afkinghts.firebaseio.com",
    projectId: "afkinghts",
    storageBucket: "afkinghts.appspot.com",
    messagingSenderId: "60348582192",
    appId: "1:60348582192:web:5fe50eeb81377dc62360f5",
    measurementId: "G-BDQ8PKPBLX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics(); 

let game = new Phaser.Game(config);
game.inventory = new Inventory();
game.scene.add('TitleScene',titleScene);
game.scene.add('GameScene',gameScene);
game.scene.add('BootScene',bootScene);
game.scene.add('LoadingScene',loadingScene);
game.scene.start('BootScene', {scene:'title'});