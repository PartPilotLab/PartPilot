<div id="top"></div>

<p align="center">

<a href="https://github.com/LenniM/PartPilot">

<img width="180" alt="Open Source Electronics Part Inventory System" src="https://github.com/LenniM/PartPilot/blob/main/public/images/PartPilot-Logo-Background.png">

</a>

<h3 align="center">PartPilot</h3>

<p align="center">
Navigating the World of Parts.
<br />
</p>
</p>

<p align="center">
<a href="https://github.com/LenniM/PartPilot/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-AGPL-purple" alt="License"></a><a href="https://github.com/LenniM/PartPilot/stargazers"><img src="https://img.shields.io/github/stars/LenniM/PartPilot?logo=github" alt="Github Stars"></a>
</p>

<br/>



## ✨ About PartPilot
<img width="1616" alt="partpilot-dashboard" src="https://i.imgur.com/Csq6zp0.png">
<video src="https://github.com/PartPilotLab/PartPilot/assets/68513575/be758637-9a01-4657-8b66-8cc2fc958c40"></video>
<br/>

Welcome to PartPilot, the ultimate open-source solution designed to streamline and enhance your electronics part management experience. Whether you're a hobbyist, a professional engineer, or part of an educational or research institution, PartPilot is here to transform the way you organize, track, and interact with your electronic components.

### Table of Contents

- [Features](#features)

- [Usage](#usage)

- [Development](#development)

- [Contribution](#contribution)

- [License](#license)

<a id="features"></a>

### Features

- 🏬 **Inventory Management**: Effortlessly catalog your electronic parts with detailed information, including datasheets, supplier data, stock levels, and more.

- 🖥️ **Direct LCSC & Mouser Integration**: Seamlessly connect with LCSC or Mouser for direct access to a vast inventory of parts, enabling easy addition and management of components within PartPilot.

- 👁️ **Barcode Scanner Functionality**: Add parts to your inventory swiftly using the barcode scanner feature, enhancing efficiency and accuracy in part management.

- 🕵️ **Search and Filter**: Quickly find the components you need with powerful search and filtering capabilities.

- 🖼️ **Intuitive Interface**: Enjoy a user-friendly experience designed to make electronics part management as efficient and straightforward as possible.

### Built on Open Source

- 💻 [Typescript](https://www.typescriptlang.org/)

- 🚀 [Next.js](https://nextjs.org/)

- ⚛️ [React](https://reactjs.org/)

- 🎨 [Mantine](https://mantine.dev/)

- 📚 [Prisma](https://prisma.io/)

- 🔒 [NextAuth](https://next-auth.js.org/)



<a id="usage"></a>

## Usage

### 🐳 Using Docker

To host PartPilot on your homeserver using docker-compose:
copy the contents of the `docker-compose-release.yml` into a `docker-compose.yml` file on your server
start the service using `docker-compose up -d` or `docker compose up -d`.

### ⚙️ Configuration

To enable the Mouser search functionality, you need to provide a Mouser Search API key.
Add the `MOUSER_API_KEY` environment variable to your deployment (e.g., in `docker-compose.yml` or `.env` file).

<a id="development"></a>

## 👨‍💻 Development

### Prerequisites

Here is what you need to be able to develop PartPilot:

- [Node.js](https://nodejs.org/en) (Version: >=18.x)

- [Docker](https://www.docker.com/) - to run PostgreSQL

### Setup

Excited to have you onboard! Lets get you started.

**Step 1: Clone the Repository**
First things first, let's get the code on your machine. Open up your terminal and run:
```
git clone https://github.com/PartPilotLab/PartPilot.git
cd PartPilot
```

**Step 2: Spin Up Docker**
With Docker, you don't need to worry about setting up Next.js or PostgreSQL manually. We've got a docker-compose.yml file that will do the heavy lifting for you.
Run the following command to build and start your containers:
```
docker-compose up --build
```
This command kicks off the magic. It'll pull in the necessary images, set up your database, and get the Next.js app running. It's like hitting the power button on your awesome electronics workstation!

**Step 3: Check It Out**
Once Docker has done its thing, your PartPilot should be up and running. Open your favorite browser and head to http://localhost:3000. Voilà! You should see the PartPilot homepage smiling back at you.

**Step 4: Make It Your Own**
Now that you're up and running, it's time to explore! Add some parts, link them to projects, play around with the barcode scanner feature, and see what PartPilot can do.

<a id="contribution"></a>

## ✍️ Contribution

We are very happy if you are interested in contributing to PartPilot 🤗

PartPilot thrives on community involvement! Whether you're interested in contributing code, providing feedback, or sharing your expertise, there's a place for you in the PartPilot community. Explore our issues, contribute to our discussions, and help us shape the future of electronics part management.

Here are a few options:

- Star this repo.

- Create issues every time you feel something is missing or goes wrong.

<a id="license"></a>

## 👩‍⚖️ License

### License: Embrace the Open-Source Spirit with AGPL-3.0

PartPilot is all about sharing, growing, and collaborating. That's why we've chosen the AGPL-3.0 license for our project. This license ensures that you, the community, have the freedom to use, modify, and share PartPilot, all while keeping the same freedom for others.

By using PartPilot, you're part of a larger movement that values open access to technology and collaborative improvement. The AGPL-3.0 license guarantees that any modifications or versions of the project you distribute will remain free and open, ensuring the community benefits from each other's improvements and contributions.

So, dive in, tweak it, twist it, and make it your own. And if you do something cool, the world gets to see and build upon it too. That's the beauty of AGPL-3.0 – it's all about giving back and moving forward together.

### Note
PartPilot is currently not production ready. There will be breaking changes.

<p align="right"><a href="#top">🔼 Back to top</a></p>
