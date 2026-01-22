import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.05, // Reduced from 0.1 for smoother movement
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        // Optimize material creation - reuse materials
        const standardMaterial = new THREE.MeshStandardMaterial();
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            color: 0x549dd2,
            ior: 3,
            transmission: 1,
            opacity: 1,
        });

        this.actualRoom.children.forEach((child) => {
            // Enable shadows only for key objects
            if (child.name === "Cube" || child.name === "Computer" || child.name === "Chair") {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    if (child.name === "Cube" || child.name === "Computer" || child.name === "Chair") {
                        groupchild.castShadow = true;
                        groupchild.receiveShadow = true;
                    }
                });
            }

            if (child.name === "Aquarium") {
                child.children[0].material = glassMaterial;
            }

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            if (child.name === "Mini_Floor") {
                child.position.x = -0.289521;
                child.position.z = 8.83572;
            }

            // Start with everything scaled to 0 for animations
            child.scale.set(0, 0, 0);
            if (child.name === "Cube") {
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        // Simplified lighting
        const width = 0.5;
        const height = 0.7;
        const intensity = 0.5; // Reduced intensity
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.02; // Reduced for smoother movement
        });
    }

    resize() { }

    update() {
        // Simplified smooth interpolation
        this.lerp.current += (this.lerp.target - this.lerp.current) * this.lerp.ease;
        this.actualRoom.rotation.y = this.lerp.current;

        // Simplified animation update
        if (this.mixer) {
            this.mixer.update(this.time.delta * 0.001);
        }
    }
}
