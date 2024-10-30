{
    score[$1] = $3 + $4 + $5
}
END{
    for(j in score) 
        printf("%s score is %d\n", j, score[j]) 
}