import { AuthService } from "./authService";
import { SellerService } from "./sellerService";
import { ListingService } from "./listingService";

const authService = new AuthService();
const sellerService = new SellerService();
const listingService = new ListingService();

export {
  authService,
  sellerService,
  listingService,
};