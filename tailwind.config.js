module.exports = {
  theme: {},
  variants: {},
  plugins: [
    function({ addComponents }) {
      const buttons = {
        ".btn": {
          padding: ".5rem 1rem",
          fontWeight: "600"
        },
        ".btn-primary": {
          backgroundColor: "#16B7B7",
          color: "#fff"
        }
      };

      addComponents(buttons);
    }
  ]
};
