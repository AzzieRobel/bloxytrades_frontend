import { AuthService } from "./authService";
import { SellerService } from "./sellerService";
import { ListingService } from "./listingService";
import { UserService } from "./userService";

const authService = new AuthService();
const userService = new UserService();
const sellerService = new SellerService();
const listingService = new ListingService();

export { authService, userService, sellerService, listingService };