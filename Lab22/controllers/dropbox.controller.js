const axios = require("axios");

const DROPBOX_TOKEN =
  "sl.u.AFpbW5e-uPum2W6DKyLeeD0-FvghEoRP9pe8lTJERJ4yxsA61XweqlJCWzzPhPtshyWe-BZJRS0hlyI6Vvy2gsi8mCRO1LEJBia4BSPJGolxCh5WDKzB96A3x6TMIy3X3ASFUnuM5DYsh3usr1TLV85HFmD_nCW30e_5nAnfEf51cCtEYHy7n2EOOEUef2sVjLUz8lIK-oSvAXK_V7Qxg3awY1x6GvbcGpzA7eLdVj2pyYJv0DompTlK6IMeSPCbTVBdcYdL6axiZQA_oAW8vncIHKNvP6O2OaR-3fiR2fzn0LG5Rv1XoQd5ueKA3DekcOLPS43vi3BRdN1rGsdZU4DoxrQBJQyPszeDXZddeZN6fezVq8XxZPodoEQRhQmfdTvh3q-npW-xHPlhFoPG9bNBDcupiPbn5XF4QO-RT6GbMCUxggmNpNZIbAsfIMzq8gzSHPwYtH0Gh_BFn2I3-bdpxkwFIx9Bgb7zuzYbK3Hy9QrLmn6K3C6LsD3vF7wUY8o_9y8rZrydxxKvFUa0f7MaOqjxPSD4to-tynpNnbLomUi8N-JkQIjtuWRyE7Yqs7xNR7u98FuQhDxtMZp8qybG1eSGXuvvcwZ0G0vvQpeo1MIi9djOsJ0p5JunMszh8-VCYQx7b-DANQ1TCkrpxmQ0oFsF_xNUYg1E_JSdOMz_tk22OoenCuG18XbyVP6YJy3Cu_MALKQLSJ6By2bXpTUJGR0JcebFAeDen1KqGA0V3e12J_lm-dEFaj85pei8RLg_2TG3T1QehijJSZFnJqBbK8owfq-ZVc61xH5qD8-pTenQTT74SPCwOQDEuHHA0ZKqc2v7phavjo9DEG6v1Sm0ZvsKy7TGR5NMfoQZZrRIYroZmKGBMmY8X6A3xQRKb3QIZwYv09HP2wmYHxbbm6_mgvE5rp1PFp_mN-Pv_U5qNR17dolM87JUfThiGZdwgKe-DpnK6jJZtrkbJIWzEVR1A0SkcAJvBE6mVCoMPPOXt9hj1fX6dBm-Qr-EOW_d3rZF4rqM888xeYstL5_NVQE0HE8FtiZAb78HGSjHn-jjNAzzIGmNk7plSxVV2FgDmfhWQjqmoe4ZT5tRaw3uAWx4gOVtfJWhjrloZqDn5f9gNadn5I-EBKIhC3pkChF0NrEkxSIiaYGJf1DKC1YR8S8HrNJfMvZCSbSiTvArxBe3uN-74CyJZ2gRm-M-q45iKKInjAg7iLZqjP6Lei_f_bcucKq4pgkEifuoKiDervXKUWyvplpKjAPbEgTRLY-FR7KDBcjruDZIOJEpWY2FvmajQqorLLT3jT-f1cFXjr5kISU8Hy14oupeVytvw8osqYx6aEwxAvuUK4Ng1yIi50NK0DA85-vy_j-4HtmvOUiFIYVSyIRKxx98Fpca35TMEqGfOKPU7IGMB1YPNz9dGK1b5hUrYIPFjftB0vjfFaDQ7WX0mP9BkESnfrK2hb_m3Go";

exports.getDropboxImages = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.dropboxapi.com/2/files/list_folder",
      { path: "" },
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const files = response.data.entries.filter((file) =>
      file.name.match(/\.(jpg|png|jpeg)$/i)
    );

    const imageLinks = await Promise.all(
      files.map(async (file) => {
        const headers = {
          Authorization: `Bearer ${DROPBOX_TOKEN}`,
          "Content-Type": "application/json",
        };

        try {
          // Intentar crear un nuevo link
          const resLink = await axios.post(
            "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
            { path: file.path_lower },
            { headers }
          );
          return resLink.data.url.replace("?dl=0", "?raw=1");
        } catch (error) {
          // Si ya existe, lo recuperamos
          if (
            error.response &&
            error.response.data.error_summary &&
            error.response.data.error_summary.includes(
              "shared_link_already_exists"
            )
          ) {
            const resExisting = await axios.post(
              "https://api.dropboxapi.com/2/sharing/list_shared_links",
              { path: file.path_lower, direct_only: true },
              { headers }
            );
            return resExisting.data.links[0].url.replace("?dl=0", "?raw=1");
          } else {
            console.error(`Error al crear enlace para ${file.name}:`, error);
            return null; // o lanza un error si prefieres
          }
        }
      })
    );

    // Filtrar posibles nulls si hubo errores en algunos
    const validLinks = imageLinks.filter((link) => link !== null);

    res.render("dropbox", { imageLinks: validLinks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al conectarse con Dropbox");
  }
};
