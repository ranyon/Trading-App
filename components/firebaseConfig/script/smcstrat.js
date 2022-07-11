// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EmreKb

//@version=5
indicator('6Figures', overlay=true, max_lines_count=500, max_bars_back=4900, max_boxes_count=500)

settings = "Settings"
zigzag_len = input.int(9, "ZigZag Length", group=settings)
show_zigzag = input.bool(false, "Show Zigzag", group=settings)
fib_factor = input.float(0.33, "Fib Factor for breakout confirmation", 0, 1, 0.01, group=settings)