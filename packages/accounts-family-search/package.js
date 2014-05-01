Package.describe({
  summary: "Login service for Family Search accounts"
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('meteor-family-search', ['client', 'server']);

  api.add_files('family-search-login-button.css', 'client');

  api.add_files("family-search.js");
});
