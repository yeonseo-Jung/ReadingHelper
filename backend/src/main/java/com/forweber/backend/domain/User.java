package com.forweber.backend.domain;


@Entity
@Table(name = "user")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // mysql의 AUTO_INCREMENT를 그대로 사용
    @Column(name = "user_idx")
    private var idx: Long = 0

    @Column(name = "id", unique = true, nullable = false)
    private var id: String = ""

    @Column(name = "name", unique = true, nullable = false, length=30)
    private var name: String = ""

    @Column(name = "password", nullable = false)
    private var password: String = ""

}