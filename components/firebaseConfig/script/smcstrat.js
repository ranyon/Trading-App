// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EmreKb

//@version=5
indicator('6Figures', overlay=true, max_lines_count=500, max_bars_back=4900, max_boxes_count=500)

settings = "Settings"
zigzag_len = input.int(9, "ZigZag Length", group=settings)
show_zigzag = input.bool(false, "Show Zigzag", group=settings)
fib_factor = input.float(0.33, "Fib Factor for breakout confirmation", 0, 1, 0.01, group=settings) 






//ict sessionss kill zone

//@version=5
//@Shanxia
// NOTE: Only works on 1HR and below and exchange timezones differ so change the session times accordingly.
//
indicator("ICT Session Killzone Boxes & Deviations", "ICT KZs", true, max_lines_count=500, max_boxes_count=500)

// INPUTS
i_time              = input.session     ('0000-0001:1234567', "New York", tooltip="Different exchanges will have difference time zones so change accordingly.")
i_maxtf             = input.int         (15, "Max TF", 1, 240)
i_vline             = input.bool        (true, "VLine", inline="in3")
i_vcol              = input.color       (#01de93, "", inline="in3")
i_vstyle            = input.string      ("Solid", "", options=["Solid", "Dotted", "Dashed"], inline="in3")
i_txtcol            = input.color       (#0098ff, " Text Col", inline="in3")


i_hline             = input.bool        (true, "HLine", inline="in1")
i_linecol           = input.color       (#0064ff, "", inline="in1")
i_linestyle         = input.string      ("Dotted", "", options=["Solid", "Dotted", "Dashed"], inline="in1")
i_ex                = input.string      ("None", "", options=["None", "+1 Day", "Right", "Both"], inline="in1")

i_shf               = input.bool        (true, "Upcoming Sessions", inline="in4")
i_lonstyle          = input.string      ("Dotted", " ", options=["Solid", "Dotted", "Dashed"], inline="in4")


i_rshow             = input.bool        (true, title='Boxes', inline='x1')
i_dev               = input.bool        (false, 'Deviations', inline='x1')
i_devno             = input.int         (2 , "", minval=1, inline='x1')


i_bool1             = input.bool        (true, "", inline='x2', group="Sessions")
i_bool2             = input.bool        (true, "", inline='x3', group="Sessions")
i_bool3             = input.bool        (true, "", inline='x4', group="Sessions")
i_bool4             = input.bool        (true, "", inline='x5', group="Sessions")
i_bool5             = input.bool        (true, "", inline='x6', group="Sessions")


cbdr                = input.session     ('1400-2001:1234567', "" ,   inline='x2', tooltip="CBDR", group="Sessions")
asia                = input.session     ('2000-2201:1234567', "",    inline='x3', tooltip="Asia", group="Sessions")
london              = input.session     ('0200-0501:1234567', "",    inline='x4', tooltip="London", group="Sessions")
nysesh              = input.session     ('0700-1001:1234567', "",    inline='x5', tooltip="New York", group="Sessions")
lcsesh              = input.session     ('1100-1301:1234567', "",    inline='x6', tooltip="London Close", group="Sessions")
i_vcbdr             = input.color       (color.new(#0064ff, 0),     "", inline='x2', group="Sessions")
i_vasia             = input.color       (color.new(#7622ff, 0),     "", inline='x3', group="Sessions")
i_vlon              = input.color       (color.new(#e90000, 0),     "", inline='x4', group="Sessions")
i_vny               = input.color       (color.new(#00cbff, 0),     "", inline='x5', group="Sessions")
i_lc                = input.color       (color.new(color.silver, 0),"", inline='x6', group="Sessions")

i_btc               = input.bool        (true, "Box Text", inline="x7", group="Sessions")
i_tcb               = input.color       (color.new(color.gray, 80), "", inline="x7", group="Sessions")

//INPUTS END

// MISC
nymid               = time              ("1", i_time, 'GMT-4')
linestyle           = i_linestyle ==    "Solid" ? line.style_solid : i_linestyle == "Dotted" ? line.style_dotted : line.style_dashed
lonstyle            = i_lonstyle  ==    "Solid" ? line.style_solid : i_lonstyle == "Dotted" ? line.style_dotted : line.style_dashed
vstyle              = i_vstyle    ==    "Solid" ? line.style_solid : i_vstyle == "Dotted" ? line.style_dotted : line.style_dashed
ex                  = i_ex        ==    "None" ? extend.none : i_ex == "+1 Day" ? extend.none : i_ex == "Right" ? extend.right : extend.both  
htime               = i_ex        ==    "+1 Day" ? 172800000 : 86400000
dow                 = dayofweek   ==    dayofweek.friday ? 259200000 : 86400000
dow2                = dayofweek   ==    dayofweek.friday ? 172800000 : 86400000 //this is for asia coming out of weekend
dow3                = dayofweek   ==    dayofweek.friday ? 172800000  : 0


disp                = timeframe.isintraday and timeframe.multiplier <= i_maxtf
// CALC
var openprice       = 0.0
if nymid
    if not nymid[1]
        openprice := open
    else
        openprice := math.max(open, openprice)



// FUNCTIONS
in_session(sess) =>
    not na(time(timeframe.period, sess, 'GMT-4'))

start_time(sess) =>
    int startTime = na
    startTime := in_session(sess) and not in_session(sess)[1] ? time : startTime[1]
    startTime

is_new_session(res, sess) =>
    t = time(res, sess, "GMT-4")
    na(t[1]) and not na(t) or t[1] < t

BarInSession(sess) =>
    time(timeframe.period, sess, 'GMT-4') != 0
    
_hline(StartTime, EndTime, Price, Color, Style, Width) =>
    return_1 = line.new(StartTime, Price, EndTime, Price, xloc=xloc.bar_time, extend=extend.none, color=Color, style=Style, width=Width)



// OBJECTS
var label lb = na
if openprice != openprice[1] and i_hline and disp
    var line lne = na
    line.set_x2(lne, nymid)
    line.set_extend(lne, extend.none)
    lne := line.new(nymid, openprice, nymid + htime + dow3, openprice, xloc.bar_time, ex, i_linecol, linestyle, 2)
    lb  := label.new(nymid + htime + dow3, openprice, "NY Midnight Open | " + str.tostring(math.round_to_mintick(openprice)), xloc.bar_time, yloc.price, na, label.style_none, i_txtcol)
    label.delete(lb[1])


f_vline(a, b, d, e, sess) => 
    var line fl1 = na
    var line fl2 = na
    var linefill lf1 = na
    st_vl = timestamp("GMT-4", year, month, sess, a, 00, 00)
    en_vl = timestamp("GMT-4", year, month, sess, b, e, 00)
    fl1 := line.new(st_vl, high, st_vl, low, xloc.bar_time, extend.both, d, lonstyle, 1)
    line.delete(fl1[1])
    fl2 := line.new(en_vl, high, en_vl, low, xloc.bar_time, extend.both, d, lonstyle, 1)
    line.delete(fl2[1])
    lf1 := linefill.new(fl1, fl2, color.new(d, 90))
    linefill.delete(lf1[1])
    for i = 0 to 100
        if time > line.get_x1(fl2[i])
            line.delete(fl2[i])
            line.delete(fl1[i])

if i_shf and disp
    f_vline(02, 05, i_vlon, 00, dayofmonth)
    f_vline(07, 10, i_vny, 00, dayofmonth)
    f_vline(11, 13, i_lc, 00, dayofmonth)
    f_vline(14, 20, i_vcbdr, 00, dayofmonth)
    f_vline(20, 22, i_vasia, 00, dayofmonth)
    f_vline(02, 05, i_vlon, 00, dayofmonth + 1)
    f_vline(07, 10, i_vny, 00, dayofmonth + 1)
    f_vline(11, 13, i_lc, 00, dayofmonth + 1)
    f_vline(14, 20, i_vcbdr, 00, dayofmonth + 1)
    f_vline(20, 22, i_vasia, 00, dayofmonth + 1)

//BOXes

ictbox(kz, bdcol,txt, x)=>
    sesh = is_new_session('1440', kz)
    float kzlow = na
    float kzhigh = na
    float kzbodlow = na
    float kzbodhigh = na

    kzbox = box(na)
    bline = line(na)
    bline2 = line(na)
    kzstart = start_time(kz)
    kzlow := sesh ? low : in_session(kz) ? math.min(low, kzlow[1]) : na
    kzhigh := sesh ? high : in_session(kz) ? math.max(high, kzhigh[1]) : na
    kzbodlow := sesh ? open : in_session(kz) ? math.min(open, kzbodlow[1]) : na
    kzbodhigh := sesh ? open : in_session(kz) ? math.max(open, kzbodhigh[1]) : na
    devdiff = kzbodhigh[1] - kzbodlow[1]

    if in_session(kz)
        if in_session(kz)[1]
            box.delete(kzbox[1])
            line.delete(bline[1])
            line.delete(bline2[1])
        if low < kzlow
            kzlow := low
            kzlow
        if high > kzhigh
            kzhigh := high
            kzhigh

        if i_rshow and x
            kzbox := box.new(kzstart, kzbodhigh, time, kzbodlow, color.new(bdcol, 50), 1, line.style_solid, extend.none, xloc.bar_time, color.new(bdcol,85), i_btc ? txt : na, size.auto, i_tcb, text_wrap=text.wrap_auto)
            kzbox
            bline := line.new(kzstart, kzhigh, time, kzhigh, xloc.bar_time, extend.none, bdcol, line.style_dashed, 1)
            bline
            bline2 := line.new(kzstart, kzlow, time, kzlow, xloc.bar_time, extend.none, bdcol, line.style_dashed, 1)
            bline2
    tz = time - time[1]
    if i_dev and not in_session(kz) and in_session(kz)[1]
        for s = 1 to i_devno by 1
            _hline(kzstart, time - 1 * tz, kzbodhigh[1] + devdiff * s, bdcol, line.style_solid, 1)
            _hline(kzstart, time - 1 * tz, kzbodlow[1] - devdiff * s, bdcol, line.style_solid, 1)

if disp
    ictbox(asia, i_vasia, "Asia", i_bool2)
    ictbox(cbdr, i_vcbdr, "CBDR", i_bool1)
    ictbox(london, i_vlon, "London", i_bool3)
    ictbox(nysesh, i_vny, "NY", i_bool4)
    ictbox(lcsesh, i_lc, "London \n Close", i_bool5)

if i_vline and nymid == nymid and disp
    line.new(nymid + dow, high, nymid + dow, low, xloc.bar_time, extend.both, i_vcol, vstyle, 1)


//END

//Day of week

i_d1        =   input.bool        (   false, "Day of week labels", inline="in14", tooltip="The timezone(TZ) can be adjusted below", group="Labels")
i_d2        =   input.color       (   #d1d4dc, "|", inline="in14", group="Labels")
i_d3        =   input.int         (   3, "  Offset", inline="in15", group="Labels")
i_d4        =   input.string      (   "GMT+10", "TZ", options=["GMT+0", "GMT+1", "GMT+2", "GMT+3","GMT+4","GMT+5","GMT+6","GMT+7","GMT+8","GMT+9","GMT+10","GMT+11","GMT+12","GMT-1", "GMT-2", "GMT-3","GMT-4","GMT","GMT-6","GMT-7","GMT-8","GMT-9","GMT-10","GMT-11","GMT-12"], inline="in15", group="Labels")

plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.monday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "MON", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.tuesday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "TUE", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.wednesday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "WED", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.thursday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "THU", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.friday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "FRI", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.saturday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "SAT", i_d2, false, size.tiny)
plotshape(i_d1 ? ta.change(time('D')) and dayofweek(time, i_d4) == dayofweek.sunday : na, "", shape.circle, location.bottom, color.new(color.black,100), i_d3, "SUN", i_d2, false, size.tiny)