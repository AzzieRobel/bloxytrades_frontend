import { Link } from "react-router-dom";
import { Discord, TikTok, Youtube, X } from '../icons/footer.icons'

export function Footer() {
  return (
    <footer className="bg-[#080C12FE] border-t border-white/5 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Disclaimer */}
          <div className="lg:col-span-2">
            <div>
              <p className="text-gray-400 text-sm text-left leading-[20px] mb-6">
                BloxyTrades operates independently and is not affiliated with, associated
                with, or endorsed by Uplift Games LLC or Roblox Corporation. We are not
                authorized, endorsed, or sponsored by Uplift Games LLC or Roblox
                Corporation. We are an independent marketplace site. All "Adopt Me"
                trademarks are owned by Uplift Games LLC.
              </p>
              <p className="text-gray-400 text-sm text-left leading-[20px] mb-8">
                © 2025 BloxyTrades—Not affiliated in any way with Roblox Corporation or
                any of its trademarks.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-[72px] h-[48px] rounded-lg bg-primary hover:hover:bg-primary/90 flex items-center justify-center text-white transition-all duration-200"
              >
                <X />
              </a>
              <a
                href="#"
                className="w-[72px] h-[48px] rounded-lg bg-primary hover:hover:bg-primary/90 flex items-center justify-center text-white transition-all duration-200"
              >
                <Youtube />
              </a>
              <a
                href="#"
                className="w-[72px] h-[48px] rounded-lg bg-primary hover:hover:bg-primary/90 flex items-center justify-center text-white transition-all duration-200"
              >
                <TikTok />
              </a>
              <a
                href="#"
                className="w-[72px] h-[48px] rounded-lg bg-primary hover:hover:bg-primary/90 flex items-center justify-center text-white transition-all duration-200"
              >
                <Discord />
              </a>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Social Media */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Social Media</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">YouTube</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">TikTok</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/#faqs" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Trust Pilot</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blogs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Affiliates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Claim Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Tutorial</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
          <div className="relative inline-block">
            <select
              className="appearance-none bg-[#151624] text-white text-base font-medium outline-none pl-10 pr-10 py-2.5 rounded-xl border border-white/10 shadow-lg w-56 transition focus:ring-2 focus:ring-primary/30"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19 9l-7 7-7-7\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.5rem center",
                backgroundSize: "1.1em"
              }}
            >
              <option value="us" data-flag="🇺🇸">
                &#127482;&#127480; United States
              </option>
              <option value="uk" data-flag="🇬🇧">
                &#127468;&#127463; United Kingdom
              </option>
              <option value="es" data-flag="🇪🇸">
                &#127466;&#127480; Spanish
              </option>
              <option value="fr" data-flag="🇫🇷">
                &#127467;&#127479; French
              </option>
            </select>
            {/* Display flag on top of select */}
            {/* <span className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-2xl">
              {
                {
                  us: "🇺🇸",
                  uk: "🇬🇧",
                  es: "🇪🇸",
                  fr: "🇫🇷"
                }[typeof window !== "undefined" && document.querySelector('select')?.value || "es"]
              }
            </span> */}
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUAb8////8AY8wAac0Aas7l7vkAZs0Abc7e6vcAYsyMsuSdvecAZcwAYMsActCEreI2gtVxod7t9PvL2vHc5fWtyOu/1O8fetP2+v2lwumXuObV4/W1ze1Ojdhom9ykwel8p+BHiddgl9sAWclLi9d3pN9pnt280e7P3PIrfdMcd9KTtOQLKOJrAAAMJklEQVR4nO2deXuiMBDG5ZAUCz2sbW2197E9vv/3W0EMk5nJASatu0/e/9YNmh+EOQOdTKKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL+d4kqtamCw62jpQr1hwrb+FCA2ZFVi36uQkzt4ztdwTMzqf7YxgcizB8Tu97yntBh+E5fApzJiXV4IMJy6jDVaTmK8Dvrfyeb/RJhfuc017vd1RhE2J+YzZk8+iXC9MNprhc7MzCIMDmTy1R82kcHAXT54Va7W2oY4Y00UdnxLxEWl45zvSzGEM6lByjnv0MocufJZmIEobx/xavD4BCE2bfzXGfZGMJ1d+md1koIwnIpv/4mzRnVcsC8xISPZZZtRwmo5sTdyEGd06/k9yxfqkKjAID5eX8CTwSn4lYOuM8R4WnW/JPVGToqf5YfXIYA0arufZQaYUkBoEWJPjjN2EMa9WHE9nurK3nUmdAe5V/iqb+ET5ofLtbqEDdCcH83FgoYNBgEhBc4syvdDwOH2V4ON0LxJUc9bpZp/ib/eas/yL/ANJLnXDcKBD2N13cjnJQree5S8h0/pqK3ePNaOwoErg+FMyHIWDYm7MS+VkJIZInTZEHyUQhXQnDnzTKQVpiO8a7sNIFT1wpcjs38HAkn1cVu2FEJ0grxk4sURIoPRh9VQa/vSpjfy3HXvbG64H1SGIEpbG4V08iiTwuec1fCSSnH3fZRw7vWoAVQb+103n4nUH9Ylc6EvSOdghvZK4JZILDSevudqt7rnzkTCqZ4sP5JwuoPuDCWseBsrCtXQi4jvPtBOwNcVBccmwRWtPM1nBQPGNDgdf0LWI85uYSEGKQGx4UrIS2QmE22X4neA9CJZo9k6rU0FsvalZDWKT9/cJFCb5+h390sYBI8gvF9EG0jxAWEo5+M2MDpvcFLJztmllMqr/nUmRDe641mPxixgfuKevsNzJI4yIIpBlpjzHSljJ/gxbIfhFFln80Qb9/GOm/Y2HBdB0yYkw+UlsgK9ZbEezhEaOWIt289A71lgP/UERYfaD2otUp01vK303AhHIhRFhiloyfVFBgDaQirFb7TQBGB5C/VB1ko3gRLnsTbd4XNNbkTS/Wm4gg/8KWH9zu6HTaTOA9GmPWxPokyZFqc44sIZ6shvCAeD7hdVCfZ+J9whKnJ2+8c3zcxlCTOZAixm+lL3UtkZ8pFOEJQ+KK5vXSUNJaDUYKOcI7tpUwwUCFYXCfhCEFNgXh7kPKQ6hus6+gIyVHywiOb3TTbQhHCvI14e2D8PsjWCFCb0xL+QRZq1zbEheB6Ho4wlSUi6u0Vv35NHMaJnRBHuTvXiwrBbbMtEGFzA+xEvL3SqCVLWHVvGsJHvEyPuNPVljgCEYJGHs3tQbMtYcwQ7HPoCHFstq2VosBCtElmGEIYSBFvD5ttzOVoTbyNEGde24WPhubv4QhB+RlbdgzABKewAqkjPEaftj0LVAjejgxDCNw2SddI6ElrcIrX5wlxmNS4X1QI7gxaEMLt8tgK5/aTQjUkm4kRW6NsbOIJcUGtuefeScQWjBCsQ2oqxee1KlpXEYWdEBdFNxYY2azOvoYghMaQaeSRdjz9BrinQkOIefL7KxSxdT4yBCFwaJZKvk6wq6ojxHmfeEXO8CEYIQxKbJV8ncBJ0hFil4gLMvU8GCGoQpPc3lVgoesILZ1sGRj7JxRVfwntlXydemOlJTTvRpBNKf+EIMGj2Z+zeoejJZwa+xPyPPsnNHn7AZIlAi2h8SbvQ0PvhLDQYurb2ySL9XpC086ufueJd0JQLKPefoBk8K4nNPR6QQrqmxBGnea+vU07r28g1PfrQdznmxAUrUd6+512SbSB8EL7dAjoCXkmhAWKsd5+p64QYiDUrhK4kjwTguYR4+0rk+g076yEOmMNq1meCUH1mXr7dLVY6bRYUbOxTQ5MhLpNlqAa7ZkQNLpobk8L9oroGdkWlU2Emo2yyi/5JQQ3OF1AlqdKmN0o7aUwEvIuUenReSWEZWCS28MCIyuaCbfNHSPhklumatncKyEoA1Nvj2vZRPR6tF7fSMjuyYUtE7+EsOlLUhulMsGLXPY2QTATctsQ1ca+T0JQe6De3uEBRLonoVnZZkLagVQKBH4JYRmYevva/tgcY/s31slCSE8L2mDjkRB8M/X2qFTPi265y+9shLSgjDZJeSQE7QgaEjObLKiYSLack30JKiExwbji7I8QtCPo7kCHx3Mb0TgzP8WNcEyob3n7JgQ32qwwPNhk0jE5UORvmfpBigiXtfr/amerJbSVZ90EH/37PMO6dnjysZntFzmSfhUOjc6Vn/s8R/99XxdZvuE6Ofn6ur7+/DwbS1jhdsTBauwl/LJ/9YFoJKE1JjscjbyEeI/IAWscocOrDA5G4whdnhI/FI0CVDvvB65RhOnC/sUHozGA4mw+1atfwIZBeh3xH7uw8N836hqa3gj00gdsRen+5iB5+EzUzMe1w8tS3rgDX+5HEZoE9niNKfMX6yUbShbWW/+bq4hnz/7fqbAv4WUyZXtYFd6IinTJFamy1wBvjdifMFmk3IGl8U0tV1z/NG9yx+FzsMgDYfLB1rbLtZYvWbGAbUFz+Bws8kGYXLAd7fpCw8cvbHGyPFzCZM0hCp0fnnPGSYit3xo+B4v8ECaXLGLBR4vcRhRRdD50+Bws8kSYHLMF/MmS8iVnTGlGpLsqy/A5WOSLMJlx/i1nuiF3TFdR9PsLhs/BIm+EySPXNs+fMOA914+q+yLL8DlY5I+Qn3uG2pKn3HmogWMZPgeLPBImz1xXu1I6IuztWsIay/A5WGQiLEqrXpQC0BOHmIJiLOtVSlitvfpJwmI9t0s1lpyZnJTyOrORgRLBBnh1jYlwRI31mkPc2ZFFyW04hjXio8r/Q7OeCZfszbz1BWysVkBLNKVd2IMj1ERk1SZgYRPJ7M527MERJlPa9m2CziUbq+Ww18Zf/8MjTI7YxOHsldu0oLw14zPMQ17+CZMVlxGzi/cLWmLWDh8moSZdJBITmHq8hnqdRAhCvkaBJTJYc2TjIS8yEWpzdKvYdFGVqOD2j/dwb60xRm21TS+6ihobf0IJ5eUFbF7iSftF3vrX17LlUCCliGMbvJdCEfJpklQNt7dYL/heCkaYnBturRomXWxx2J/CESbPWkSlWnwV+L1KAQnZikyjFLakL0K/OCokoeblc7mSENah3/0VlJDf0pXBt9TNw4Tb8OcCEupsjWJnwqRMcI7hCPX+AtbWNN05fwpHeGswITUMedlcxJ+CEd4YbaQS0jjmIiMVipCtG/ZSw9I/IRFNhJnxSahGtS7ytuZPamoRMqwxEGY3RwubNNtKPhyyJyU9NN20eypIBsx39pF2LdGtzIH6PgpB6Gj/u7Z2p2A5cADCOVdP5KIbdV9vqDqGf0K27Fm9sd1FpZrI9nUOkHD5xVyuasabS7WBGqZg6p2Qm2bbfbllt3nBqv4yyF+F8E3ILbUOgzWXSmdmHuKVtJ4JuaRXNifYNrjSXQvRfPLbIeUKF8Biskm/0gYP8KpoY73UYX+p0uU+Z9ah4thZW6IWNX6U0EHKTgXuRpN7nVrxtkQpTA2fg0UeCdnYEr2Xl8/oYdI/fA4W+SNkE8IaWys+ogNJ//A5WOSNcG3dKbPVituuADLi4XOwyBchW9dNuWd12JFCvj99+Bws8kT4wZU9C/yw4VZs/CY3ow6fg0V+CNmEEG9pk+J3anZGd/gcLPJCOOU2+qj7LJQHnNn4TeTzgyVkE0I1+bsunuA/2fht29cfPgeLPBAuuXi52UHT6zVDa5aN39q9GcPnYNH+hGycooYy7SWrlDd+sHtLmox4+Bws2p+QizXVcmh326VKcZWN3zb37vA5WAQI82y4ysunlPlYCWWk6SxhELsUBXNgeheScOZPsEsPgh0FfHrKHhqSMIyU4jD9+xhE/xyh6irbbZj/F+ESucrOrf9HhPR1TSfcYzT/LiHj9XL613j+YUK2UJ+ZnxH+pwjf+GaL+Rlh/4TkDxR6k3Y/nvEZYe+E4m629bzfrW5VHRM9bHUDdKlq3Ymt4neIjw/0mzt5J5yIwZGa7i/bIxn/jK7+2/0TRkVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX9lv4CcC7ViV+qKTUAAAAASUVORK5CYII=" alt="Amex" className="h-5" />
            </div>
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="data:image/png;base64,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" alt="Apple Pay" className="h-5" />
            </div>
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="data:image/png;base64,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" alt="Diners Club" className="h-5" />
            </div>
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMyVi9y1uscnGU0s3vMwC9XpgMhO-1d8sfoA&s" alt="Discover" className="h-5" />
            </div>
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
            </div>
            <div className="h-9 px-3 bg-white rounded flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
