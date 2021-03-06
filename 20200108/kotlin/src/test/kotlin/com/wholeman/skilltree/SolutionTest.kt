package com.wholeman.skilltree

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

fun solution(skill: String, skill_trees: Array<String>): Int {
    return skill_trees
            .map { it.replace("""[^${skill}]""".toRegex(), "") }
            .count {
                skill.startsWith(it) || it.isBlank()
            }
}

class SolutionTest {

    @Test
    fun `Find available skill tree in a given skill trees`() {
        assertThat(solution("CBD", arrayOf("BACDE", "CBADF", "AECB", "BDA"))).isEqualTo(2)
        assertThat(solution("ABC", arrayOf("EFG"))).isEqualTo(1)
    }
}
