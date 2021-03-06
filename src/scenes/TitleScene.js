import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import JSONLevelScene from "./JSONLevelScene";
import firebase from "firebase/app";
import auth from "firebase/auth";
import database from "firebase/database";

class TitleScene extends JSONLevelScene {

    constructor(){
        super('TitleScene');

        this.prefab_classes ={
            background: Prefab.prototype.constructor
        }

        
    }
    preload () {
        this.load.json('default_data', 'src/assets/default_data.json');
    }
    
    create () {
        super.create();
        
        this.default_data = this.cache.json.get('default_data');

        this.input.on('pointerdown', function (pointer) {
           this.login();
        }, this);
    }
    
    start_game() {
        this.scene.start('BootScene', {scene: 'game'});
    }
    
    login () {
        if (!firebase.auth().currentUser) {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            
            firebase.auth().signInWithPopup(provider).then(this.on_login.bind(this)).catch(this.handle_error.bind(this));
        } else {
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value").then(this.retrieve_data.bind(this));
        }
    }
    
    on_login (result) {
        firebase.database().ref("/users/" + result.user.uid).once("value").then(this.retrieve_data.bind(this));
    }
    
    retrieve_data (snapshot) {
        let user_data = snapshot.val();
        if (!user_data) {
            this.cache.game.player_data = this.default_data.player_data;
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/player_data').set(this.cache.game.player_data).then(this.start_game.bind(this));
        } else {
            this.cache.game.player_data = user_data.player_data || this.default_data.player_data;
            /*let items = user_data.items || this.default_data.items;
            for (let item_key in items) {
                this.cache.game.inventory.collect_item(this, items[item_key], item_key);
            }*/
            this.start_game();
        }
    }
    
    handle_error(error) {
        console.log(error);
    }
}

export default TitleScene;