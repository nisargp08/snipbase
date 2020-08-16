<template>
  <div class="login-view">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 register">
          <div class="columns">
            <div class="column left">
              <h1 class="title is-1">Snipbase</h1>
              <h2 class="subtitle colored is-4">
                Join the Stack Overflow community
              </h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis ex deleniti aliquam tempora libero excepturi vero
                soluta odio optio sed.
              </p>
            </div>
            <div class="column right has-text-centered">
              <h1 class="title is-4">Login</h1>
              <p class="description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit
              </p>
              <form>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-primary is-fullwidth is-medium"
                >
                  Submit
                </button>
                <br />
                <small>
                  <div class="extras">
                    <a>Forgot Password</a><br />
                    <a>Create an Account</a>
                  </div>
                </small>
              </form>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br />
          <nav class="level">
            <div class="level-right">
              <small class="level-item" style="color: $textLight">
                &copy; Super Cool Website. All Rights Reserved.
              </small>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>
