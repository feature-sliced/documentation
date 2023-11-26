function getTemplateNameByRules(path, rules) {
    const filteredRules = rules.filter((rule) =>
        new RegExp(rule.pattern).test(path),
    );
    const sortedRules = filteredRules.sort((a, b) => b.priority - a.priority);
    return sortedRules[0]?.name || "basic";
}

module.exports = { getTemplateNameByRules };
