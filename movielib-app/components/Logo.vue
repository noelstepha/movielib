<template>
  <div class="logo-container py-4">
  <img
    class="logo"
    alt="Movielib Logo"
    src="/movielib-logo.png"
  >
  </div>
</template>

<style>
.logo-container {
  height: 200px;
}

.logo {
  width: 100%;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
  height:100%;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
