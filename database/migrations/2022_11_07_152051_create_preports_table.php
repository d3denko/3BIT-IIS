<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->date('date')->nullable();

            $table->integer('Q1');
            $table->integer('Q2');
            $table->integer('Q3');
            $table->integer('Q4');
            $table->integer('Q5');
            $table->integer('Q6');
            $table->integer('Q7');
            $table->integer('Q8');
            $table->integer('Q9');
            $table->integer('Q10');
            $table->integer('Q11');
            $table->integer('Q12');
            $table->integer('Q13');
            $table->integer('Q14');
            $table->integer('Q15');
            $table->integer('Q16');
            $table->integer('Q17');
            $table->integer('Q18');
            $table->integer('Q19');
            $table->integer('Q20');
            $table->boolean('B11');
            $table->boolean('B12');
            $table->boolean('B13');
            $table->boolean('B14');
            $table->boolean('B15');
            $table->boolean('B16');
            $table->boolean('B17');
            $table->boolean('B18');
            $table->boolean('B19');
            $table->boolean('B110');
            $table->boolean('B111');
            $table->boolean('B112');
            $table->boolean('B113');
            $table->string('Other');
            $table->boolean('B21');
            $table->boolean('B22');
            $table->boolean('B23');
            $table->boolean('B24');
            $table->boolean('B25');
            $table->boolean('B26');
            $table->boolean('B27');
            $table->boolean('B28');
            $table->decimal('HQp',10,2)->nullable();

            $table->unsignedBigInteger('treatment_id');
            $table->foreign('treatment_id')->references('id')->on('treatments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('preports');
    }
};
