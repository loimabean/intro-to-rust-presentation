import { defineAppSetup } from "@slidev/types";
import QrcodeVue from "qrcode.vue";

export default defineAppSetup(({ app }) => {
  app.component("qrcode", QrcodeVue);
});
