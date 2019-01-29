class Github {
  constructor() {
    this.client_id = "637d1e456dff12ba0f34";
    this.client_secret = "2b6cd2e7ce57a7f65b2b5d36439b1511ff0778a8";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${
        this.client_id
      }&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    return {
      profile
    };
  }
}
