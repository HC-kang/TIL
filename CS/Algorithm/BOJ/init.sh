#! /bin/bash

echo "Enter the number of problems you want to create: "
read n

mkdir $n
touch $n/solution.py
touch $n/input.txt
touch $n/output.txt

echo "Created $n problems"
