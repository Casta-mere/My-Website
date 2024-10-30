BEGIN {
    math = 0
    english = 0
    computer = 0
 
    printf "NAME       NO.    MATH  ENGLISH  COMPUTER   TOTAL\n"
    printf "-------------------------------------------------\n"
}
{
    math+=$3
    english+=$4
    computer+=$5
    printf "%-10s %-6s %4d %8d %8d %8d\n", $1, $2, $3,$4,$5, $3+$4+$5
}
END {
    printf "-------------------------------------------------\n"
    printf "  TOTAL:    %10d %8d %8d \n", math, english, computer
    printf "AVERAGE:    %10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR
}