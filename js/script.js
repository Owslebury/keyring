// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a torus geometry (ring)
const geometry = new THREE.TorusGeometry(2, 0.1, 16, 100);

// Create a standard material for shading
const material = new THREE.MeshStandardMaterial({ color: 0xA8A8A8 });

// Create a mesh with the geometry and material for the torus (ring)
const torus = new THREE.Mesh(geometry, material);

// Add the torus to the scene
scene.add(torus);

// Create an array to hold the spheres
const spheres = [];

// Create a function to add spheres on the circle of the torus
function addSpheresOnCircle() {
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32); // Sphere size
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xd9ff00 }); // Red color for spheres

    const radius = 2; // Radius of the torus

    // Calculate positions of spheres on the circle
    const numberOfSpheres = 20; // Number of spheres to add
    for (let i = 0; i < numberOfSpheres; i++) {
        const angle = ((Math.PI / (numberOfSpheres - 1)) * i) + Math.PI; // Angle between spheres
        const x = Math.cos(angle) * radius; // x position
        const y = Math.sin(angle) * radius; // y position

        // Create sphere and set position
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(x, y, 0);

        // Calculate rotation to match torus
        sphere.lookAt(torus.position);

        // Add sphere to the scene
        scene.add(sphere);

        // Add sphere to the array
        spheres.push(sphere);
    }
}

// Call the function to add spheres on the circle of the torus
addSpheresOnCircle();

// Add lighting with adjustable brightness
const light = new THREE.PointLight(0xffffff, 1); // Intensity is initially set to 1
light.position.set(5, 7, 100);
scene.add(light);

// Render the scene
renderer.render(scene, camera);

// Function to handle mouse clicks
function onDocumentClick(event) {
    // Calculate mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast from the camera to the mouse position
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with spheres
    const intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
        // A sphere is clicked
        const selectedSphere = intersects[0].object;

        // Get the index of the selected sphere
        const selectedIndex = spheres.indexOf(selectedSphere);

        // Get the total number of spheres
        const totalSpheres = spheres.length;

        // Calculate the index of the leftmost and rightmost spheres
        const leftmostIndex = 0;
        const rightmostIndex = totalSpheres - 1;

        // Check if the clicked sphere is the leftmost or rightmost
        if (selectedIndex === leftmostIndex || selectedIndex === rightmostIndex) {
            // Calculate the angle to move the sphere around the torus
            const angleIncrement = Math.PI;
            const targetAngle = selectedIndex === leftmostIndex ? -angleIncrement : angleIncrement;
            // Animate the sphere to move around the torus
            const duration = 2000; // Duration of the animation in milliseconds

            // Animation function
            function animateSphere() {
                const now = Date.now();
                const elapsedTime = now - startTime;

                if (elapsedTime < duration) {
                    const t = elapsedTime / duration;
                    const currentAngle = targetAngle * t;
                    let newPosition = new THREE.Vector3(Math.cos(currentAngle) * 2, Math.sin(currentAngle) * 2, 0);
                    if (selectedIndex === leftmostIndex) {
                        newPosition = new THREE.Vector3(Math.cos(currentAngle + Math.PI) * 2, Math.sin(currentAngle + Math.PI) * 2, 0);
                    }
                    selectedSphere.position.copy(newPosition);
                    requestAnimationFrame(animateSphere);
                } else {
                    selectedSphere.position.set(Math.cos(targetAngle) * 2, Math.sin(targetAngle) * 2, 0);
                }

                renderer.render(scene, camera);
            }

            const startTime = Date.now(); // Start time of the animation
            animateSphere();
        }
    }
}

// Add event listener for mouse clicks
document.addEventListener('click', onDocumentClick, false);
