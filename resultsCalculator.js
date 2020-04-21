function calculate(questions, responses) {
    const questionResponsePairs = questions.map(({ text, options }, i) => [
        text,
        calcOptions(options, responses.map(response => response[i]))
    ]);

    return Object.fromEntries(questionResponsePairs);
}

function calcOptions(options, responses) {
    const optionResultPairs = responses
        .reduce(
            (results, response) => results.map((result, i) => i !== response ? result : result + 1),
            Array(options.length).fill(0)
        )
        .map((result, i) => [options[i], result]);

    return Object.fromEntries(optionResultPairs);
}

exports.calculate = calculate;